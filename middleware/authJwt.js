//authJwt.js : vérifier le jeton, vérifier les rôles des utilisateurs dans la base de données

const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');  //appel auth config 

const db = require('../models')