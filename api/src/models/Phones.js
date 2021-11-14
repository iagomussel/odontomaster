const { Model, DataTypes } = require("sequelize");

class Phones extends Model {
  static init(sequelize) {
    super.init(
      {
        phone: DataTypes.STRING,
        type: DataTypes.STRING,
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Patient, {
      through: "patient_phones",
      as: "patient",
    });
  }
}

module.exports = Phones;
