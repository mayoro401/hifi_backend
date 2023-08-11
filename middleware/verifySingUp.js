//verifySignUp.js : vérifie le nom d'utilisateur ou l'e-mail en double

// Pour vérifier une action d'inscription, nous avons besoin de 2 fonctions :
// - vérifier si username ou email est en double ou non
// - vérifier si "roles" de la demande existe ou non


//************************************  Créer des fonctions middleware  ***************************** */
//inscription utilisateurs

//importation dependances poour interagir avec la base de donnee
const db = require('../models');
const ROLES = db.ROLES;
const Personne = db.Personne;

checkDuplicateUsernameOrEmailOrTelephone = (req, res, next) =>{

    //verification du nom d'utilisateurs
    Personne.findOne({where:{username : req.body.username}})
        .then(personne =>{
            if (personne){
                res.status(400).send({
                    message:"Erreur, Username deja utilisé"
                })
                return;
            }
        })

    //verification email
    Personne.findOne({ were: {email : req.body.email}})
        .then(personne =>{
            if (personne){
                res.status(400).send({
                    message: "Erreur, Email dêja utilisé"
                })
                return;
            }
        }) 

    //verification du numero de telephone
    Personne.findOne({ where: {telephone: req.body.telephone}})
        .then(personne =>{
            if (personne){
                RTCRtpSender.status(400).send({
                    message:"Erreur, Numero de telephone deja utilisé"
                });
                return;
            }
            next()
        })

};

//Cette fonction intermédiaire est utilisée pour valider les rôles fournis lors de l'inscription.
checkRolesExisted =(req,  res, next ) =>{
    if(req.body.roles){
        for(var i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    messagge:"Erreur, ce role n'existe pas "+req.body.roles[i]
                });
                return;
            }
        }
    }
    next() ;
}

const verifySignUp = {
    checkDuplicateUsernameOrEmailOrTelephone : checkDuplicateUsernameOrEmailOrTelephone,
    checkRolesExisted : checkRolesExisted
};

module.exports = verifySignUp;


