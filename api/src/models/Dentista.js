const { Model, DataTypes } = require("sequelize");


class Dentista extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        imagem: DataTypes.STRING,
      },
      { sequelize, tableName: "dentistas" }
    )


  }
  static associate(models){
    this.belongsTo(models.User,{foreignKey:"user_id", as: "user"})
    this.hasMany(models.Consulta,{foreignKey:"dentista_id", as: "consulta"})
  }
}

module.exports = Dentista;

