'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('my_courses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'courses',
            key: 'id',
          },
          onDelete: 'cascade'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
    await queryInterface.addConstraint('my_courses', {
      type: 'unique',
      fields: ['user_id', 'course_id'],
      name: 'UNIQUE_MYCOURSES_USER_COURSE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('my_courses');
  }
};
