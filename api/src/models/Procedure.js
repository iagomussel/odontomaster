const { Model, DataTypes } = require("sequelize");

class Procedure extends Model {
    static init(sequelize) {
        super.init(
            {
                tuss: { type: DataTypes.STRING, allowNull: true },
                nome: { type: DataTypes.STRING, allowNull: false },
                valor: { type: DataTypes.INTEGER, allowNull: true, default:0 },
                duração: { type: DataTypes.INTEGER, allowNull: true, default: 30 },
                periodicidade: { type: DataTypes.INTEGER, allowNull: true, default:0 },
            },
            { sequelize }
        );
    }
}

module.exports = Procedure;
