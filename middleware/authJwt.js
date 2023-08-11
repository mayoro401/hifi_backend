//authJwt.js : vérifier le jeton, vérifier les rôles des utilisateurs dans la base de données

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js"); //appel auth config

const db = require("../models");
const Personne = db.personne;

//middleware (fonction intermédiaire) utilisé pour vérifier la validité
//d'un jeton d'accès JWT (JSON Web Token) inclus dans l'en-tête de la requête

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Aucun jeton fourni !",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Non autorisé",
      });
    }
    req.PersonneId = decoded.id;
    next();
  });
};

//middleware (fonction intermédiaire) qui vérifie si l'utilisateur
//associé à l'ID récupéré du jeton d'accès JWT a le rôle "admin".

isAdmin = (req, res, next) => {
  Personne.findByPk(req.PersonneId).then((personne) => {
    personne.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; ++i) {
        if (roles[i].nom_role === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "role admin requis",
      });
      return;
    });
  });
};

//middleware (fonction intermédiaire) qui vérifie si l'utilisateur
//associé à l'ID récupéré du jeton d'accès JWT a le rôle "vendeur".
isVendeur = (req, res, next) => {
  Personne.findByPk(req.PersonneId).then((personne) => {
    personne.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nom_role === "vendeur") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "role vendeur requis",
      });
    });
  });
};

//middleware (fonction intermédiaire) qui vérifie si l'utilisateur
//associé à l'ID récupéré du jeton d'accès JWT a le rôle "admin" ou "vendeur".

isVendeurOrAdmin = (req, res, next) => {
  //rechercher une personne dans la base de données
  Personne.findByPk(req.PersonneId).then((personne) => {
    //obtenir les rôles associés à cette personne.
    personne.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        //Vérification des rôles "vendeur" ou "admin" :

        if (roles[i].nom_role === "vendeur") {
          next(); //permettre la poursuite du flux de contrôle
          return;
        }
        if (roles[i].nom_role === "admin") {
          next();
          return;
        }

        //Si la personne n'est ni vendeur ni administrateur :
        res.status(403).send({
          messagge: "role admin ou vendeur requis",
        });
      }
    });
  });
};

const authJwt = {
  verifyToken : verifyToken,
  isAdmin : isAdmin,
  isVendeur : isVendeur,
  isVendeurOrAdmin : isVendeurOrAdmin,
}

module.exports = authJwt;
