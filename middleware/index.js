//  ce morceau de code sert à organiser et à exposer les fonctionnalités liées
//  à l'authentification et à la vérification des utilisateurs en utilisant 
//  les modules authJwt et verifySignUp. Cela rend ces fonctionnalités disponibles 
//  pour d'autres parties de l'application qui doivent les utiliser.

const authJwt = require('./authJwt.js');
const verifySignUp = require('./verifySignUp.js');

module.exports = {
    authJwt,
    verifySignUp
}
