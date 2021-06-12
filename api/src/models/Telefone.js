const { Model, DataTypes } = require("sequelize");

class Telefone extends Model {
  static init(sequelize) {
    super.init(
      {
        telefone: DataTypes.STRING,
      },
      { sequelize, tableName: "telefones" }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Paciente, {
      through: "pacientes_telefones",
      as: "pacientes",
    });
  }
}

module.exports = Telefone;
