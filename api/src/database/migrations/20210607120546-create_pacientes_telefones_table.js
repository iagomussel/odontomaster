'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pacientes_telefones", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "pacientes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      telefone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "telefones", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pacientes_telefones');
  }
};
