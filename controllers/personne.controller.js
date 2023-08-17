const db = require('../models');

const Personne = db.personne;
module.exports = {

    //creer une personne 
    createPerson (req, res) {
        Personne.create(req.body)
            .then(personne =>{
                if(personne){
                    res.send({
                        message: ` la personne a été enregistré avec succés `
                    })
                }else{
                    res.send({
                        message: `erreur d'enregistrement `})
                }
                // res.status(200).json(personne)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    },

    //recuperer toutes les personnes
    getAllPersons (req, res){
        Personne.findAll()
            .then(personne =>{
                res.status(200).json(personne)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    },

    //recuperer les clients
    getClients (req, res){
        Personne.findAll({where: {profil: "client"}})
            .then(client =>{
                if(client){
                    res.send(client)
                }else{
                    res.send({
                        message: "Impossible de d'afficher les clients"
                    })
                }
                // res.status(200).json(client)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    },

    //recuperer les vendeurs
    getVendeurs (req, res) {
        Personne.findAll ({ where :{ profil : "vendeur" }})
            .then(vendeur =>{
                if(vendeur){
                    res.send(vendeur)
                }else{
                    res.send({
                        message: "Impossible de d'afficher les vendeurs"
                    })
                }
                // res.status(200).json(vendeur);
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    },

    //mettre a jour une personne
    updatePerson (req,res ){
        const idPerson = req.params.id;
        Personne.findOne(req.body, {where: {id : idPerson}})
        .then(personne =>{
            if (personne){
                res.send({
                message: `la personne a été bien mis à jour`
                })
            }else{
                res.send({message: "la personne n'existe pas"})
            }
        })
        .catch(err =>{
            res.send({message: err.message})
        })
    },

    //supprimer une personne    
    deletePerson (req,res ) {
        const idPerson = req.params.id;
        Personne.destroy({ where:{id:idPerson} })
            .then(personne => {
                if (personne){
                    res.send( {
                        message: 'suppressioon réussie'
                    })
                }else{
                    res.send({
                        message: 'erreur de suppression'
                    })
                }
            })
            .catch(err => {
                res.send({ message: err.message })
            })
    },

}

exports.allAccess = (req, res)=>{
    res.status(200).send("public content")
};

exports.userBoard = (req, res)=>{
    res.status(200).send("user content")
}
exports.vendeurBoard = (req, res)=>{
    res.status(200).send("vendeur content")
}

exports.adminBoard = (req, res)=>{
    res.status(200).send("admin content")
}