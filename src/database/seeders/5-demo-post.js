'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'Post 1',
        sub_title: '',
        image: 'http://localhost:8080/uploads/thumnail-1.png',
        view_count: 0,
        desc: '',
        user_id: 1,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 2',
        sub_title: '',
        image: 'http://localhost:8080/uploads/thumnail-1.png',
        view_count: 0,
        desc: '',
        user_id: 1,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
