'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("pacientes", "convenio_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {model:"convenios",key: "id"},
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("pacientes","convenio_id");
  },
};
