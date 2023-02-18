'use-strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      seo_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      thumbnail: {
        type: Sequelize.STRING(255),
      },
      view_count: {
        type: Sequelize.INTEGER(20),
        allowNull: true,
        defaultValue: 0,
      },
      desc: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      category_id: {
        type: Sequelize.BIGINT.UNSIGNED,
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
