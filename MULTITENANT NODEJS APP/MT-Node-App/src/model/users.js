const Sequelize = require('sequelize');
const { tenant1 } = require("../config/tenant1");

const tenant = tenant1.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },

    last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(400),

    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,


});

module.exports = tenant;