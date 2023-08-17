// const {verifySignUp} = require('../middleware/verifySignUp');
// const controller = require('../controllers/auth.controller'); // Importation du contrôleur d'authentification

// module.exports = function (app) {
//     // Middleware pour gérer les en-têtes CORS
//     app.use(function (req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     // Route pour l'inscription d'utilisateur
//     app.post(
//         '/api/auth/inscription',
//         [ verifySignUp.checkRolesExisted,
//           verifySignUp.checkDuplicateUsernameOrEmailOrTelephone ],
//         controller.signUp
//     );

//     // Route pour la connexion d'utilisateur
//     app.post('/api/auth/connexion', controller.signIn);
// };
