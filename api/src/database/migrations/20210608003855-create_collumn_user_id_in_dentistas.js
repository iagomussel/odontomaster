"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("dentistas", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model:"users",key: "id"},
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("dentistas","user_id");
  },
};
