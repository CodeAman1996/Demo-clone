const Sequelize = require('sequelize');
const { sequelize } = require("../config/commonDBconnection");

const tenant = sequelize.define("tenants", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true
    },
    db_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        allowNull: false,
    },
    db_host: {
        type: Sequelize.STRING(255),

    },
    db_username: {
        type: Sequelize.STRING(100),

    },
    db_password: {
        type: Sequelize.TEXT,

    },
    db_port: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 3306,

    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,


});

module.exports = tenant;