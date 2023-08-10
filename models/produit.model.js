module.exports = (sequelize, Sequelize) => {

    const Produit = sequelize.define('produits',{

        nom_produit:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        description:{
            type:Sequelize.STRING,
            // allowNull: false,
        },
        prix:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        statu:{
            type:Sequelize.BOOLEAN,
        },
        image :{
            type:Sequelize.TEXT,
            allowNull: false,
        },

    })

    return Produit;
}
