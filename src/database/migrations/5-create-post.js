'use-strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      sub_title: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      desc: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      view_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
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
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Posts');
  },
};
