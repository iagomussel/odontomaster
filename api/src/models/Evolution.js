const { Model, DataTypes } = require("sequelize");
const moment = require("moment");

class Evolution extends Model {
    static init(sequelize) {
        super.init(
            {
                descricao: DataTypes.TEXT,
                tipo: {
                    type: DataTypes.STRING,
                    defaultValue: "evolucao",
                },
                data_registro: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    get() {
                        return moment(this.getDataValue("data_registro")).format("DD/MM/YYYY HH:mm");
                    },
                },
            },
            { sequelize }
        );
    }

    static associate(models) {
        this.belongsTo(models.Consultation, { foreignKey: "consultation_id", as: "consultation" });
        this.belongsTo(models.Professional, { foreignKey: "professional_id", as: "professional" });
    }
}

module.exports = Evolution;
