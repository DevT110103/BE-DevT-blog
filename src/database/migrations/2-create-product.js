'use-strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      seo_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      view_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
