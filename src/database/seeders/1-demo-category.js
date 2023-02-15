'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Web',
        thumbnail: 'http://localhost:8080/uploads/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'App',
        thumbnail: 'http://localhost:8080/uploads/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Game',
        thumbnail: 'http://localhost:8080/uploads/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Post',
        thumbnail: 'http://localhost:8080/uploads/thumnail-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
