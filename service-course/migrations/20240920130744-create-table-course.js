'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      certificate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['free', 'premium'],
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['draft', 'published'],
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      level: {
        type: Sequelize.ENUM,
        values: ['all-level', 'beginner', 'intermediate', 'advanced'],
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mentor_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'mentors'
          },
          key: 'id',
          onDelete: 'cascade'
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};
