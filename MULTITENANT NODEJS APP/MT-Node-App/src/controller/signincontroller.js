const responder = require('../../Utils/responder');

try {
    var uuidv4 = require('uuid/v4');
} catch (error) {
    var { v4: uuidv4 } = require('uuid');
}

const tenant = require('../model/commondb');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const newuser = {
        uuid: uuidv4(),
        db_name: req.body.name,
        db_host: req.body.host,
        db_username: req.body.username,
        db_password: await bcrypt.hash(req.body.password, salt),
        db_port: req.body.port
    }
    newTenant = await tenant.create(newuser);

    responder.sendResponse(res, 200, "success", newTenant, "login successfully.");


}