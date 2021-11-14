const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        reset_password_token: DataTypes.STRING,
      },
      { sequelize }
    );
  }
}

module.exports = User;
