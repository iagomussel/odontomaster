'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("convenios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: Sequelize.STRING, allowNull: false },

      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("convenios");
  },
};
