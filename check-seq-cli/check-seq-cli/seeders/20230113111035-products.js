'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      title: 'Apple AirPods',
      description: "https://www.apple.com/airpods",
      price: 199,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple iPhone Pro',
      description: "https://www.apple.com/iphone-11-pro",
      price: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple Watch',
      description: "https://www.apple.com/watch",
      price: 499,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Vespa Primavera',
      description: "https://www.vespa.com/us_EN/vespa-models/primavera.html",
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'New Balance 574 Core',
      description: "https://www.newbalance.com/pd/574-core/ML574-EG.html",
      price: 84,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Tribe Messenger Bike 004',
      description: "https://tribebicycles.com/collections/messenger-series/products/mess-004-tx",
      price: 675,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Stumptown Hair Bender Coffee',
      description: "https://www.stumptowncoffee.com/products/hair-bender",
      price: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
}