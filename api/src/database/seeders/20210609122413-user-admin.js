'use strict';
const passwordHash = require("password-hash");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: passwordHash.generate('admin'),
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Users', null, {});
  }
};
