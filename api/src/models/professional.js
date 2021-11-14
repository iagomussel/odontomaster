const { Model, DataTypes } = require("sequelize");


class Professional extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      { sequelize, tableName: "professional" }
    )


  }
  static associate(models){
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
      this.hasMany(models.Consultation, { foreignKey: "dentista_id", as: "consultation" })
      this.hasMany(models.Patient, { foreignKey: "dentista_id", as: "paciete" })
  }
}

module.exports = Professional;

