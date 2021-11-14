const { Model, DataTypes } = require("sequelize");

class Obs extends Model {
  static init(sequelize){
    super.init(
      {
        Observacao: {type: DataTypes.STRING}
      },
      { sequelize, tableName:'observacoes'}
    )

    }
    static associate(models){
        this.belongsTo(models.Patient, { as: "patient" });
    }
}

module.exports= Obs;


