'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Actions', [
      {
        post_id: 1,
        user_id: 1,
      },
    ]);
  },
};
