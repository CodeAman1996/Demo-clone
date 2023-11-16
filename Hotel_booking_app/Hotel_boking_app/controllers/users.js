//const User = require('../models/user');
const Sequelize = require('sequelize');
const userschema = require('../models/user');

exports.updateUser = async (req, res, next) => {
    try {
        const updateUser = await userschema.update(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}

exports.DeleteUser = async (req, res, next) => {
    try {
        const updateUser = await userschema.destroy(
            { where: { id: req.params.id } }
        );
        res.status(200).json("User has been deleted succesfully");
    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await userschema.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userschema.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}