"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("pacientes", "dentista_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {model:"dentistas",key: "id"},
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn("pacientes","dentista_id");
  },
};
