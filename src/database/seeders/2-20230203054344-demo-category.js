'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Web',
        thumbnail_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Game',
        thumbnail_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Learn code',
        thumbnail_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
