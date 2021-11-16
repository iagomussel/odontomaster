const { Model, DataTypes } = require("sequelize");

class Obs extends Model {
  static init(sequelize){
    super.init(
      {
        obs: {type: DataTypes.STRING}
      },
      { sequelize}
    )

    }
    static associate(models){
        this.belongsTo(models.Patient, { as: "patient" });
    }
}

module.exports= Obs;


