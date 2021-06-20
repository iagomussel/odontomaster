const { Model, DataTypes } = require("sequelize");

class Observacoes extends Model {
  static init(sequelize){
    super.init(
      {
        Observacao: {type: DataTypes.STRING}
      },
      { sequelize, tableName:'observacoes'}
    )

    }
    static associate(models){
        this.belongsTo(models.Paciente, { as: "paciente" });
    }
}

module.exports= Observacoes;


