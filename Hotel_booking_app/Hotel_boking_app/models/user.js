const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const userschema = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        require: true,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        require: true,
        unique: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(255),
        // allowNull: false,

    },
    img: {
        type: DataTypes.STRING(255),


    },
    address: {
        type: DataTypes.STRING(255),
        //allowNull: false,

    },

    city: {
        type: DataTypes.STRING(255),
        //  allowNull: false,

    },

    phone: {
        type: DataTypes.INTEGER,
        //allowNull: false,

    }, password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,

    },
    isadmin: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,

    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    // timestamps: true,
})
module.exports = userschema;