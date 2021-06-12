const { Model, DataTypes } = require("sequelize");

class Convenio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      { sequelize }
    );
  }
}

module.exports = Convenio;
