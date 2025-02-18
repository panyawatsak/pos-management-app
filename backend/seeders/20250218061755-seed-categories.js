'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Fruit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vegetables',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};