'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Apple',
        category_id: 1,
        price: 1.50,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Banana',
        category_id: 1,
        price: 3,
        stock: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Broccoli',
        category_id: 2,
        price: 5,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Computer',
        category_id: 3,
        price: 500,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};