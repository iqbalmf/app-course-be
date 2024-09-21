'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'courses'
          },
          key: 'id',
          onDelete: 'cascade'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chapters');
  }
};
