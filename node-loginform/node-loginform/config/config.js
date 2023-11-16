const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('common_db2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to common_db2`)
}).catch((err) => {
    console.log(err)
})

// const db = {}
// db.Sequelize = Sequelize
// db.sequelize = sequelize

// //connecting to model
// db.users = require('./usermodel')

//exporting the module
module.exports = sequelize;
// module.exports = sequelize;