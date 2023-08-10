module.exports = (sequelize, Sequelize) => {
    
    const Role =sequelize.define("role", {
        nom_role:{
            type:Sequelize.STRING,
            allowNull: null,
        }
    })

    return Role;
}