//configurer la base de données MySQL & Sequelize

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD : "root",
    DB: "hifi",
    dialect: "mysql",
    pool :{
        max :5,
        min :0,
        aquire :30000,
        idle :10000
    }
}