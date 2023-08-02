module.exports = (sequelize, Sequelize) =>{

    const Categorie = sequelize.define('categorie',{

        nom_categorie:{
            type: Sequelize.STRING,
            allowNull:false,
        },
    })

    return Categorie;
}