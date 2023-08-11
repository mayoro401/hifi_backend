//auth.controller.js : gère les actions d'inscription, de connexion et de déconnexion

const db = require("../models");
const config = require("../config/auth.config");

const Personne = db.personne;
const Role = db.role;

const Op = db.Sequelize.Op;

//Inscription
exports.signUp = (req, res) => {
  //save data on db
  Personne.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    username: req.body.username,
    telephone: req.body.telephone,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 6),
  })
    .then((personne) => {
      if (req.body.roles) {
        Role.findAll({ where: { nom_role: { [Op.or]: req.body.roles } } }).then(
          (roles) => {
            personne.setRoles(roles).then(() => {
              res.send({
                message: "Inscription réussie avec succés",
              });
            });
          }
        );
      } else {
        //personne role =1
        personne.setRoles([1]).then(() => {
          res.send({
            message: "Inscription réussie avec succès",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//connexion d'utilisatreurs
exports.signIn = (req, res) => {
  Personne.findOne({ where: { email: req.body.email } })
    .then((personne) => {
      if (!personne) {
        return res.status(404).send({
          message: "email not found",
        });
      }
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        personne.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: personne.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, //24heures
      });

      var authorities = [];

      personne.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nom_role.toUpperCase());
        }
        res.status(200).send({
          id: personne.id,
          nom: personne.nom,
          prenom: personne.prenom,
          username: personne.username,
          telephone: personne.telephone,
          email: personne.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
