
const Sequelize = require('sequelize');

const sequelize = new Sequelize("userdb", "root", "root", {
    dialect: "mysql",
    host: "localhost",
});

//console.log(process.env, "process env");
console.log('DB connected');

module.exports = sequelize; 
