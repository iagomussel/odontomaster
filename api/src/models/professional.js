const { Model, DataTypes } = require("sequelize");


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
            /**from monday to friday 08:00 - 18:00 */
            default: {
                "1":{
                    "open":"08:00",
                    "close":"18:00"
                },
                "2":{
                    "open":"08:00",
                    "close":"18:00"
                },
                "3":{
                    "open":"08:00",
                    "close":"18:00"
                },
                "4":{
                    "open":"08:00",
                    "close":"18:00"
                },
                "5":{
                    "open":"08:00",
                    "close":"18:00"
                }
            }
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

