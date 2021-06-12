"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false 
      },
      username: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      reset_password_token: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
