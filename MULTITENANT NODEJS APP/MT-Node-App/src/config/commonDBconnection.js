const config = require("../config/config")['development'];

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     //operatorsAliases: false,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },

// });

// var sequelize = new Sequelize('common_db2', 'root', 'shoot', {
//     host: 'localhost',
//     dialect: 'mysql',

//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },
// });

const sequelize = new Sequelize(
    {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: 'mysql',
        host: process.env.PORT,
    }
);

module.exports = { sequelize };



