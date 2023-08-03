const db = require('../models');

const Personne = dnb.personne;
module.exports = {

    //creer une personne 
    createPerson (req, res) {
        Personne.create(req.body)
            .then(personne =>{
                res.status(200).json(personne)
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
                res.status(200).json(client)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    },

    //recuperer les vendeurs
    getVendeurs (req, res) {
        Personne.findAll ({ where :{ profil : "vendeur" }})
            .then(vendeur =>{
                res.status(200).json(vendeur);
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    },

    //mettre a jour une personne
    updatePerson (req,res ){
        const idPerson = req.params.id;
        Personne.findOne(req.body, {where: {idPerson : id}})
        .then(personne =>{
            if (personne ==1){
                res.send({
                message: `le ${profil} a été bien mis à jour`
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
        Personne.destroy({ where:{idPerson} })
            .then(personne => {
                if ( personne ==1){
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