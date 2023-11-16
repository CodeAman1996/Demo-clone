const Sequelize = require('sequelize');
const connection = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = { connection };