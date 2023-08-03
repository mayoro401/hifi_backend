const db = require('../models');

const Categorie = db.categorie;
module.exports ={

    //creation d'une categorie
    createCategorie(req, res){
        Categorie.create(req.body)
            .then(categorie => {
                res.status(200).json(categorie);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    },

    //recuperer tous les categories
    getAllCategories (req,res ){
        Categorie.findAll()
            .then(categorie =>{
                res.status(201).json(categorie)
            })
            .catch(error =>{
                res.status(500).json(error)
            })
    },

    //mettre a jour un categorie
    updateCategorie (req, res){
        const idCategorie = req.params.id;
        Categorie.update(req.body, {where: {id: idCategorie}})
            .then(categorie =>{
                if(categorie == 1){
                        res.send({
                            message: 'le categorie a ete supprime avec succes'
                        })
                } else {
                    res.send({message: 'aucun changement'})
                }
            })
            .catch(error => {
                res.status(400).json(error)
            } )
    },

    //supprimer un categorie
    deleteCategorie (req, res){
        const idCategorie = req.params.id;
        Categorie.destroy ({ where :{id: idCategorie}} )
            .then(categorie =>{
                if (!categorie){
                    res.send({
                        message: `Impossible de supprimer le categorie avec id=${id}. Peut etre que ce gategorie n'a pas ete trouve!`
                    })
                }else{
                    res.send({message:'la categorie est bien supprimée'})
                }
            })
            .catch(error => {
                res.status(200).send(error)
            })
    }

    



}

