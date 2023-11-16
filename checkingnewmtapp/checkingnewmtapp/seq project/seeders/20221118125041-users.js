'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{

      first_name: 'Rakshit',
      last_name: 'chaudhary',
      email: 'rc@gmail.com',
      address: 'India',


    }, {

      first_name: 'Andrea',
      last_name: 'martin',
      email: 'am@gmail.com',
      address: 'Greece',


    }, {

      first_name: 'Mark',
      last_name: 'jacob',
      email: 'mj@gmail.com',
      address: 'USA',


    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
