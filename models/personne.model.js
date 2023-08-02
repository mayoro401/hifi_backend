const { DataTypes } = require("sequelize");

const Personne = sequelize.define('Personne', {
    
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profil: {
    type: DataTypes.ENUM('admin', 'vendeur', 'client'),
    allowNull: false,
  },
});
