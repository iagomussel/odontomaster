"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pacientes", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false 
      },
      ficha: Sequelize.BIGINT,
      data_nasc: Sequelize.DATE,
      sexo: Sequelize.STRING,
      email: Sequelize.STRING,
      imagem: Sequelize.STRING,
      nome: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pacientes");
  },
};
