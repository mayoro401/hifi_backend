//appel de notre db config 
const dbConfig = require('../config/db.config');
const dbconfig  = require('../config/db.config');

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
//notre base de données
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;