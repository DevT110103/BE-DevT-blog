'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        post_id: 1,
        user_id: 1,
        detail: 'Cái này hay thế',
      },
      {
        post_id: 2,
        user_id: 1,
        detail: 'Cái này pro thế',
      },
    ]);
  },
};
