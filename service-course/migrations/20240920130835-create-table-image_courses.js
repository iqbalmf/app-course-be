'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('image_courses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'courses',
            key: 'id'
          },
          onDelete: 'CASCADE',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('image_courses');
  }
};
