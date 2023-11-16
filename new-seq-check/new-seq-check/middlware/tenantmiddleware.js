const Sequelize = require('sequelize');
const Tenant = require('../models/tenant');

const tenantmiddleware = async (req, res ,next)=>{
    //get tenantid from URL
    const tenantID = req.params.tenantId;

    //find tenant by id
    const tenant = await Tenant.findByiD(tenantId);

    //connect to tenant's database
    const tenantConnection = new Sequelize(tenant.dbName,
        tenant.dbUserName,
        tenant.dbPassword,{
            host:'localhost',
            dialect:'mysql'
        });

        //save tenant connection to request object

        req.tenantConnection = tenantConnection;

        //move to next middleware
        next();
}

module.exports = {tenantmiddleware};