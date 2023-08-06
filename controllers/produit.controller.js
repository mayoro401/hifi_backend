const db = require('../models');
const Produit = db.produit;

module.exports = {

    
    //creation d'un nouveau produit
    createProduit(req, res) {
        console.log(req.body);
        Produit.create(req.body)
                .then(produit => {
                  if(produit){
                    return res.status(201).json({
                      message: "Le produit a été ajouté avec succés"})
                  }else{
                    res.send({
                      message: "Le produit n'a pas abouti"
                    })
                  }
                    // res.status(200).json(Produit);
                })
                .catch(error => { 
                    res.status(500).json(error) 
                })
    },

    //recuperation de tous les produits
    getAllProduits(req, res)  {
        Produit.findAll()
            .then(Produit => {
                res.status(200).json(Produit)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    },
    //recuperer les produits publies
    PublishProduit(req, res){
      Produit.findAll({ where:{ statu:true}})
      .then(produit => {
          res.send(produit)
        })
      .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la récupération des produits."
          })
      })
  },


  //recuperer les produits non publies
  NoPublishProduit(req, res){
    Produit.findAll({ where:{ statu:false}})
    .then(produit => {
        res.send(produit)
      })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des produits."
        })
    })
},


    //mettre a jour un produit
    updateProduit(req,res) {
        const idProduit = req.params.id;
        Produit.update(req.body, {where:{ id : idProduit}})
        .then(produit => {
            if (produit) {
              res.send({
                message: "Produit  a été mis à jour avec succès."
              });
            } else {
              res.send({
                message: `Impossible de mettre à jour le produit. Peut-être que le produit n'a pas été trouvé ou que req.body est vide!`
              });
            }
          })
            .catch(error => {
                res.status(500).json(error)
            })
    },

    //supprimer un produit
    
    deleteProduit(req, res) {
        const idProduit = req.params.id;
        Produit.destroy({where:{ id: idProduit}})
            .then(Produit => {
                res.status(200).json(Produit)
            })
            .catch(error => {
                res.status(500).json(error)
            })   
    },

    // deleteProduit(req, res) {
    //     const idProduit = req.params.id;
    //     Produit.destroy({ where: { id: idProduit } })
    //           .then(produit => {
    //               if (!produit) {
    //                 res.send({
    //                   message: `Impossible de supprimer le produit . Peut etre que ce produit n'a pas ete trouve!`
    //                 });
    //               } else {
    //                 res.send({
    //                   message: "Produit a été supprimé avec succès!"
    //                 });
    //               }
    //             })
    //             .catch(err => { 
    //                 res.status(500).json({ status: 'error', message: JSON.stringify(err) }) 
    //             });
    // },


        //recuperer un seul produit
        getProduitById(req, res) {
          const idProduit = req.params.id;
          Produit.findOne({where: {id: idProduit}})
              .then(Produit =>{
                  if (Produit) {
                      res.send(Produit)
                    } else {
                      res.send({
                        message: `Impossible de trouver le produit.`
                      });
                   }
              })
              .catch(err => {
                  res.status(500).send({
                      message: "Erreur lors de la récupération du produit " 
                    });
              })
      },
  
    
}