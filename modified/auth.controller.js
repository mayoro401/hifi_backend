// //auth.controller.js : gère les actions d'inscription, de connexion et de déconnexion

// // Importation des modules nécessaires
// const db = require("../models");
// const config = require("../config/auth.config");

// // Importation des modèles Personne et Role depuis le module db
// const Personne = db.personne;
// const Role = db.role;

// // Importation de l'opérateur Sequelize Op
// const Op = db.Sequelize.Op;

// // Inscription de l'utilisateur
// exports.signUp = (req, res) => {
//   // Création d'une nouvelle personne dans la base de données
//   Personne.create({
//     nom: req.body.nom,
//     prenom: req.body.prenom,
//     username: req.body.username,
//     telephone: req.body.telephone,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 6), // Hashage du mot de passe
//   })
//     .then((personne) => {
//       if (req.body.roles) {
//         // Si des rôles sont spécifiés dans la requête
//         Role.findAll({ where: { nom_role: { [Op.or]: req.body.roles } } }).then(
//           (roles) => {
//             // Assignation des rôles à la personne
//             personne.setRoles(roles).then(() => {
//               res.send({
//                 message: "Inscription réussie avec succés",
//               });
//             });
//           }
//         );
//       } else {
//         // Si aucun rôle n'est spécifié, assigner le rôle par défaut (role = 1)
//         personne.setRoles([1]).then(() => {
//           res.send({
//             message: "Inscription réussie avec succès",
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       // Gestion des erreurs
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

// // Connexion d'utilisateurs
// exports.signIn = (req, res) => {
//   // Recherche de la personne par adresse e-mail
//   Personne.findOne({ where: { email: req.body.email } })
//     .then((personne) => {
//       if (!personne) {
//         // Si la personne n'est pas trouvée, renvoyer une réponse avec code 404
//         return res.status(404).send({
//           message: "email not found",
//         });
//       }

//       // Vérification du mot de passe
//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         personne.password
//       );

//       if (!passwordIsValid) {
//         // Si le mot de passe est invalide, renvoyer une réponse avec code 401
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!",
//         });
//       }

//       // Création du jeton d'accès JWT
//       const token = jwt.sign({ id: personne.id }, config.secret, {
//         algorithm: "HS256",
//         allowInsecureKeySizes: true,
//         expiresIn: 86400, // 24 heures
//       });

//       // Préparation des autorités (rôles) pour la réponse
//       var authorities = [];

//       personne.getRoles().then((roles) => {
//         for (let i = 0; i < roles.length; i++) {
//           authorities.push("ROLE_" + roles[i].nom_role.toUpperCase());
//         }

//         // Renvoyer la réponse réussie avec les informations de l'utilisateur et le jeton d'accès
//         res.status(200).send({
//           id: personne.id,
//           nom: personne.nom,
//           prenom: personne.prenom,
//           username: personne.username,
//           telephone: personne.telephone,
//           email: personne.email,
//           roles: authorities,
//           accessToken: token,
//         });
//       });
//     })
//     .catch((err) => {
//       // Gestion des erreurs
//       res.status(500).send({ message: err.message });
//     });
// };
