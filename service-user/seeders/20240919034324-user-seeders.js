'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Iqbal',
        profession: 'Admin Micro',
        role: 'admin',
        email: 'my@my.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Fauzan',
        profession: 'Frontend Dev',
        role: 'student',
        email: 'test@test.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
