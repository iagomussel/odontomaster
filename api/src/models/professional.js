const { Model, DataTypes } = require("sequelize");


class Professional extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        imagem: DataTypes.STRING,
      },
      { sequelize}
    )


  }
  static associate(models){
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
      this.hasMany(models.Consultation, { foreignKey: "professional_id", as: "consultation" })
      this.hasMany(models.Patient, { foreignKey: "patient_id", as: "patient" })
  }
}

module.exports = Professional;

