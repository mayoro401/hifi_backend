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
        Personne.findAll ({ where :{ profil :"vendeur" }})
            .then(vendeur =>{
                res.status(200).json(vendeur);
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }

}