const Sequelize = require('sequelize');

const tenant1 = new Sequelize("tenantcln1_db", "root", "shoot", {
    dialect: "mysql",
    host: "localhost",
    port: "3306"

});

module.exports = { tenant1 };