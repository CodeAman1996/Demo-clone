const { Sequelize } = require('sequelize');
const { connection }= require('../config/config');

const Tenant = connection.define('tenant', {

    tenantId:{
      type:Sequelize.INTEGER,
      primarykey: true,
      allowNull:false
  },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dbname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dbUserName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    dbpassword: {
        type: Sequelize.STRING,
        allowNull: false,
      }
  });

  module.exports= {Tenant};