const Sequelize = require('sequelize');

const sequelize = new Sequelize("tenantcln2_db", "root", "shoot", {
    dialect: "mysql",
    host: "localhost",
    port: "3306"

});

module.exports = { sequelize };