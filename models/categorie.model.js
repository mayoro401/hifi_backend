module.exports = (sequelize, Sequelize) => {
  const Categorie = sequelize.define("categorie", {
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });


  return Categorie;
};
