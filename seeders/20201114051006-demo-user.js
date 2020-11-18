'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        user_email: 'admin@mail.com',
        user_password: '12345678',
        user_fname: 'John',
        user_lname: 'Doe',
        user_tel: '0931021805',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_email: 'user@mail.com',
        user_password: '12345678',
        user_fname: 'Migrate',
        user_lname: 'JJ',
        user_tel: '0931021808',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
