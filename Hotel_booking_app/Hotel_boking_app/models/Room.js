
const { Sequelize, DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/database');

const Roomschema = sequelize.define("Rooms", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        require: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: false,
    },
    maxPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },

    desc: {
        type: DataTypes.STRING(255),
        allowNull: false,
        require: true,

    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [DATE] } }],


    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,

})
module.exports = Roomschema;