'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        title: 'Web bán hàng',
        sub_title: '1 web bán hàng vippro hehehe',
        thumbnail_id: 1,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Web block chain',
        thumbnail_id: 1,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Web game',
        thumbnail_id: 1,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
