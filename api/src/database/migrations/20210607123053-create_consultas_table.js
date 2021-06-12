"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("consultas", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false 
      },
      dentista_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model:"dentistas",key: "id"},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      paciente_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model:"pacientes",key: "id"},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      procedimento_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model:"procedimentos",key: "id"},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      horario: Sequelize.DATE,
      horario_termino: Sequelize.DATE,
      observacao: Sequelize.STRING,
      paciente_nome: Sequelize.STRING,
      paciente_telefone: Sequelize.STRING,
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("consultas");
  },
};
