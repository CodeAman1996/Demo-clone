'use strict';

try {
  var uuidv4 = require('uuid/v4');
} catch (error) {
  var { v4: uuidv4 } = require('uuid');
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tenants', [{
      uuid: uuidv4(),
      db_name: 'tenant1db',
      db_host: 'localhost',
      db_username: 'root',
      db_password: 'shoot',
      db_port: '3306',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      uuid: uuidv4(),
      db_name: 'tenant2db',
      db_host: 'localhost',
      db_username: 'root',
      db_password: 'shoot',
      db_port: '3306',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
