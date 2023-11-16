const User = require('../models/user');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const { createError } = require('../utils/error');
const { sign } = require('jsonwebtoken');
//const JWT = TR8793T6R367DE93IWDE;
const Sequelize = require('sequelize');
const sequelize = require('../config/database');



exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        sequelize
            .sync({ force: true })
            .then(result => {
                return User.create({ username: req.body.username, email: req.body.email, country: req.body.country, password: hash, })

                console.log(result);
            }).then(User => {
                Userid = User.id;
                console.log("User created", User);
            }),





            // const newUser = async (req, res, next) => {

            //     let info = {
            //         username: req.body.username,
            //         email: req.body.email,
            //         country: req.body.country,
            //         password: hash,
            //     }
            //     const adduser = await User.create(info)
            //     res.status(200).send(adduser)
            //     console.log(adduser)
            // }
            // await newUser(req, res);
            res.status(200).send('User has been created');

    }
    catch (error) {
        next(error)
    }
};


exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "user not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect)
            return next(createError((400, "wrong password or username")));

        const token = sign({
            id: user.id, isAdmin: user.isAdmin
        }, "TR8793T6R367DE93IWDE")


        const { password, isAdmin, ...otherDetails } = user;

        res.cookie("access_token", token, {
            httponly: true,
        }, {
            success: 1,
            message: 'login succesfully',
            token: token
        })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin, access_token: token })
    }
    catch (error) {
        next(error)
    }
};     
