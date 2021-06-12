"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("dentistas", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false 
      },
      
      nome: { type: Sequelize.STRING, allowNull: false },
      imagem:{type: Sequelize.STRING},
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("dentistas");
  },
};
