
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const { getNamespace } = require('continuation-local-storage');
const users = require('../src/model/users');
const { sequelize } = require('../src/config/commonDBconnection');
const sequelize1 = require('../src/config/tenant1');
debugger;
let connectionMap;

/**
 *  Create knex instance for all the tenants defined in common database and store in a map.
**/
exports.connectAllDb = async () => {
    let tenants;

    try {
        tenants = await sequelize.query("SELECT * FROM `tenants`", { type: QueryTypes.SELECT });
    } catch (e) {
        // console.log('error', e);
        return;
    }
    debugger;
    connectionMap =
        tenants
            .map(tenant => {

                // console.log(tenant);
                return {
                    [tenant.uuid]: new Sequelize(createConnectionConfig(tenant))

                }

            })
            .reduce((prev, next) => {
                return Object.assign({}, prev, next);
            },
                {});

    // console.log('uiuuu', connectionMap);
}

/**
 *  Get the connection information (knex instance) for the given tenant's uuid.
**/

exports.getConnectionByuuid = (uuid) => {
    if (connectionMap) {
        console.log('coneectionuuid-------', connectionMap[uuid]);
        return connectionMap[uuid];
    }
}
/**
*  Get the connection information (knex instance) for current context.
**/
exports.getConnection = () => {
    const nameSpace = getNamespace('unique context');
    const conn = nameSpace.get('connection');
    if (!conn) {
        throw 'Connection is not set for any tenant database.';
    }
    return conn;
}
/**
 *  Create configuration object for the given tenant.
**/
function createConnectionConfig(tenant) {
    debugger;
    return {
        database: tenant.db_name,
        username: tenant.db_username,
        password: tenant.db_password,
        dialect: "mysql",
        host: tenant.db_host
    }

}


