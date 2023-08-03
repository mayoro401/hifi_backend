const express = require('express');
const routes = express.Router();

const PersonneController = require('../controllers/personne.controller');

routes.post('/', PersonneController.createPerson)
routes.get('/', PersonneController.getAllPersons)
routes.get('/clients', PersonneController.getClients)
routes.get('/vendeurs',PersonneController.getVendeurs)
routes.put('/:id', PersonneController.updatePerson)
routes.delete('/:id', PersonneController.deletePerson)

module.exports = routes;