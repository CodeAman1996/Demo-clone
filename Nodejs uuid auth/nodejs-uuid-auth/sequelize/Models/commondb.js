const Sequelize = require('sequelize')

const sequelize = require('../utils/Database')

const User = sequelize.define('tenant', {

    // id: {
    //     type: Sequelize.INTEGER(32),
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true,
    // },

    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true

    },
    db_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    db_host:
    {
        type: Sequelize.STRING,
    },
    db_password:
    {
        type: Sequelize.TEXT,
    },
    db_port:
    {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 3306,
    },
    //Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    freezeTableName: true
})
module.exports = User



