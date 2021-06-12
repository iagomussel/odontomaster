"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("procedimentos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tuss: { type: Sequelize.STRING, allowNull: true },
      nome: { type: Sequelize.STRING, allowNull: false },
      valor: { type: Sequelize.INTEGER, allowNull: false },
      periodicidade: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("procedimentos");
  },
};
