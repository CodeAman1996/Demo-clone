
const { QueryTypes } = require('sequelize');

const { getConnection } = require('../../Utils/connectionManager');
//module.exports = require('./lib/sequelize');
/**
* Get all the users.
**/
exports.getAll = async (req, res, next) => {

    res.json({ body: await getConnection().query("SELECT * FROM `users`", { type: QueryTypes.SELECT }) });

};

/**
* Get user by Id.
**/
exports.getUserById = async (req, res, next) => {

    res.json({ body: await getConnection().query("SELECT * FROM `users`", { type: QueryTypes.SELECT }) });

};