module.exports = (sequelize, Sequelize) => {

    const Produit = sequelize.define('produit',{

        nom_produit:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        description:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        prix:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },

    })

    return Produit;
}