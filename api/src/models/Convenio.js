const { Model, DataTypes } = require("sequelize");

class Convenio extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: DataTypes.STRING,
                default: { type: DataTypes.BOOLEAN, allowNull: true }
            },
            { sequelize }
        );
    }
}

module.exports = Convenio;
