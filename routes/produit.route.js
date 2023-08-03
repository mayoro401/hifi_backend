const express = require('express');
const routes = express.Router();

const ProduitController = require('../controllers/produit.controller');

routes.post('/', ProduitController.createProduit)
routes.get('/', ProduitController.getAllProduits)
routes.get('/:id', ProduitController.getProduitById)
routes.get('/publies', ProduitController.PublishProduit)
routes.put('/:id', ProduitController.updateProduit)
routes.delete('/:id', ProduitController.deleteProduit)



module.exports = routes;