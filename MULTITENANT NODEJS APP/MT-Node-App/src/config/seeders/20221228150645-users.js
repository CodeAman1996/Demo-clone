'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{

      first_name: 'shambhav',
      last_name: 'rajapaksa',
      email: 'sr@gmail.com',
      address: 'srilanka',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {

      first_name: 'leonel',
      last_name: 'messi',
      email: 'lm@gmail.com',
      address: 'Argentina',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {

      first_name: 'Li',
      last_name: 'ju hung',
      email: 'ljh@gmail.com',
      address: 'Taiwan',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};