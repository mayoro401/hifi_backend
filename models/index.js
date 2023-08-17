//appel de notre db config
const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: "8889",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    aquire: dbConfig.pool.aquire,
    idle: dbConfig.pool.idle,
  },
});

//notre base de données
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Definir les tables de la base de données
db.personne = require("../models/personne.model")(sequelize, Sequelize);
db.categorie = require("../models/categorie.model")(sequelize, Sequelize);
db.produit = require("../models/produit.model")(sequelize, Sequelize);
// db.role = require("../models/role.model")(sequelize, Sequelize);

//*******************************   relation entre les tables  *********************************

// Configuration de la relation one-to-many entre Categorie et Produit
db.categorie.hasMany(db.produit);
db.produit.belongsTo(db.categorie);

// Configuration de la relation one-to-many entre Personne et role
// db.role.belongsToMany(db.personne, {
//   through: "personne_roles",
// });
// db.personne.belongsToMany(db.role, {
//   through: "personne_roles",
// });


//les valeurs que role peut prendre
// db.ROLES = ["client", "vendeur", "admin"];

//relation entre categorie et produit
// db.pro
module.exports = db;
