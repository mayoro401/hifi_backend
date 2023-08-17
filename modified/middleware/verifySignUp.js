// //verifySignUp.js : vérifie le nom d'utilisateur ou l'e-mail en double

// // Pour vérifier une action d'inscription, nous avons besoin de 2 fonctions :
// // - vérifier si username ou email est en double ou non
// // - vérifier si "roles" de la demande existe ou non


// //************************************  Créer des fonctions middleware  ***************************** */
// //inscription utilisateurs

// // Importation des dépendances pour interagir avec la base de données
// const db = require('../models');
// const ROLES = db.ROLES;
// const Personne = db.personne;

// // Middleware pour vérifier les doublons de nom d'utilisateur, d'e-mail ou de numéro de téléphone
// checkDuplicateUsernameOrEmailOrTelephone = (req, res, next) => {
//     // Vérification du nom d'utilisateur
//     Personne.findOne({ where: { username: req.body.username } })
//         .then(personne => {
//             if (personne) {
//                 res.status(400).send({
//                     message: "Erreur, Nom d'utilisateur déjà utilisé"
//                 });
//                 return;
//             }
            
//             // Vérification de l'e-mail
//             Personne.findOne({ where: { email: req.body.email } })
//                 .then(personne => {
//                     if (personne) {
//                         res.status(400).send({
//                             message: "Erreur, Email déjà utilisé"
//                         });
//                         return;
//                     }

//                     // Vérification du numéro de téléphone
//                     Personne.findOne({ where: { telephone: req.body.telephone } })
//                         .then(personne => {
//                             if (personne) {
//                                 res.status(400).send({
//                                     message: "Erreur, Numéro de téléphone déjà utilisé"
//                                 });
//                                 return;
//                             }
//                             next();
//                         });
//                 });
//         });
//     }
// // Middleware intermédiaire pour valider les rôles fournis lors de l'inscription
// checkRolesExisted = (req, res, next) => {
//     if (req.body.roles) {
//         for (var i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     message: "Erreur, ce rôle n'existe pas : " + req.body.roles[i]
//                 });
//                 return;
//             }
//         }
//     }
//     next();
// }

// // Objet qui contient les fonctions middleware à exporter
// const verifySignUp = {
//     checkDuplicateUsernameOrEmailOrTelephone: checkDuplicateUsernameOrEmailOrTelephone,
//     checkRolesExisted: checkRolesExisted
// };

// // Exportation de l'objet verifySignUp pour être utilisé dans d'autres parties de l'application
// module.exports = verifySignUp;
