const express = require('express');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const sequelize = require('./config/database');

//Import Routes
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes.js');
// const HotelRoutes = require('./routes/Hotelroutes.js');
// const RoomRoutes = require('./routes/Roomroutes')

const app = express();
dotenv.config();

//middleware
app.use(cors());
app.use(cookieparser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/hotel', HotelRoutes);
// app.use('/api/room', RoomRoutes);

app.listen(3000, () => {
    console.log('listening to port 3000');
});



