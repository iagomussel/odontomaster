'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("telefones", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      telefone: Sequelize.STRING,
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.dropTable('telefones');
     
  }
};
