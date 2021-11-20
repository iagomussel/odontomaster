const { Model, DataTypes } = require("sequelize");
const Constants = require("../utils/Constants");


class Professional extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        imagem: DataTypes.STRING,
        crm: DataTypes.STRING,
        especialidade: DataTypes.STRING,
        availableDays: {
            type:DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('availableDays'));
            },
            set: function(value) {
                this.setDataValue('availableDays', JSON.stringify(value));
            },
            default: Constants.AVAILABLE_DAYS
        }
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

