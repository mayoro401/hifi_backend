//appel de notre db config 
const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: "8889",
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        aquire: dbConfig.pool.aquire,
        idle: dbConfig.pool.idle
    }
    
});

//*******************************   relation entre les tales  *********************************

//relation entre personne et role
db.role.belongsToMany( db.personne, {
    through: "person_role"
})
db.personne.belongsToMany( db.role,{
    through: "person_role"
})

//relation entre categorie et produit
db.pro

//notre base de données
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Definir les tables de la base de données
db.personne = require("../models/personne.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.produit = require("../models/produit.model")(sequelize, Sequelize);
db.categorie = require("../models/categorie.model")(sequelize,Sequelize);

module.exports = db;