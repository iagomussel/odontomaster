const { Model, DataTypes } = require("sequelize");

class Procedimento extends Model {
  static init(sequelize) {
    super.init(
      {
        tuss: { type: DataTypes.STRING, allowNull: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        valor: { type: DataTypes.INTEGER, allowNull: false },
        periodicidade: { type: DataTypes.INTEGER, allowNull: false },
      },
      { sequelize }
    );
  }
}

module.exports = Procedimento;
