'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'Lê Trần Tấn',
        last_name: 'Tài',
        email: 'taic21a.th1@gmail.com',
        phone_number: '0865850073',
        address: '165 Bình Chánh Bình Chánh TP.HCM',
        password: '123456',
        role_id: 1,
      },
    ]);
  },
};
