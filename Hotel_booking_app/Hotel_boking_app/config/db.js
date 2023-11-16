require("dotenv").config()
const Sequelize = require('sequelize');
const userschema = require("../models/user");
const sequelize = require('./database');

sequelize
    .sync({ force: true })
    .then(result => {
        return userschema.create({
            username: 'Aman', email: 'aman@gmail.com', country: 'india', address: 'Ujjain', city: 'city',
            phone: '97579790', password: '12345', isAdmin: 'true'
        })

        console.log(result);
    }).then(userschema => {
        userschemaid = userschema.id;
        console.log("First User created", User);
    })
    .catch((err) => {
        console.log(err);
    });

