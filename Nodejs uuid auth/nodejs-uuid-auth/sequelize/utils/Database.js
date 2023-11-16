const Sequelize = require('sequelize')
const mysql = require('mysql2');

// Creating new Object of Sequelize
const sequelize = new Sequelize(
    'common_db2',
    'root',
    'root', {

    dialect: 'mysql',
    define: {
        timestamps: true,
        freezeTableName: true
    },
    logging: false,
    host: 'localhost'
}
);
console.log('connected!');

module.exports = sequelize