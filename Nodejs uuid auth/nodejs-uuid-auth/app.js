const Sequelize = require('sequelize')


const sequelize = require('./sequelize/utils/Database')


const User = require('./sequelize/Models/commondb.js');

sequelize.sync()
sequelize.sync({ force: true })



