
module.exports = (sequelize, Sequelize) => {

const Personne = sequelize.define('Personne', {
    
  nom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prenom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  telephone: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profil: {
    type: Sequelize.ENUM('admin', 'vendeur', 'client'),
    allowNull: false,
  },
  
}
)
return Personne;
};
