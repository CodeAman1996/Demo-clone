const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const sequelize = require('sequelize')
const cookieParser = require('cookie-parser');
const db = require('./config/config')
const userRoutes = require ('./routes/userRoutes')

const PORT = 3000;

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes for the user API
app.use('/api/users', userRoutes)

//listening to server connection

app.listen(PORT,()=>{
    console.log(`express server listening on port ${PORT} `);
})