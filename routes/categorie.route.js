const express = require('express');
const routes = express.Router();

const CategorieController = require('../controllers/categorie.controller');

routes.post('/', CategorieController.createCategorie )
routes.get('/', CategorieController.getAllCategories)
routes.put('/:id', CategorieController.updateCategorie)
routes.delete('/:id', CategorieController.deleteCategorie)


module.exports = routes;
