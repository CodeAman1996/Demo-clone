//user model
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

    const User = sequelize.define( "Users", {
 
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: false}, )
   
    module.exports = User;