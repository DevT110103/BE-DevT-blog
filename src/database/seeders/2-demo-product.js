'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Web bán hàng',
        seo_name: 'Web_ban_hang',
        link: '',
        thumbnail: 'http://localhost:8080/uploads/thumnail-1.png',
        view_count: 0,
        desc: '',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
