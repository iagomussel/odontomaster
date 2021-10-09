'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('convenios', [{
            nome: 'Particular',
            default: true,
            created_at: new Date(),
            updated_at: new Date()
        }]);
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('convenios', null, {});
  }
};
