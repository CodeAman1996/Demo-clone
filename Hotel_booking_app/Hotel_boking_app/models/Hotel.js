const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotelschema = sequelize.define("Hotels", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        require: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(255),
        require: true,
        unique: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: false,

    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,

    },

    city: {
        type: DataTypes.STRING(255),
        allowNull: false,

    },
    distance: {
        type: DataTypes.STRING(255),
        allowNull: false,

    },

    photos: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,

    },
    desc: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,

    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 0,
        max: 10,

    },
    rooms: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,

    },
    cheapestPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,


    },
    featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,

    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,

})
module.exports = Hotelschema;