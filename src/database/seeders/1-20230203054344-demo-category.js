'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Web',
        thumbnail: 'http://localhost:8080/images/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Game',
        thumbnail: 'http://localhost:8080/images/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Learn code',
        thumbnail: 'http://localhost:8080/images/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
