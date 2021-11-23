const { Model, DataTypes } = require("sequelize");

class Plan extends Model {
    static init(sequelize) {
        super.init(
            {
                numero: { type: DataTypes.STRING, allowNull: true },
                ativo: { type: DataTypes.STRING, allowNull: true },
            },
            { sequelize }
        );
    }
    static associate(models) {
        //associate with patient
        this.belongsTo(models.Patient, { foreignKey: "patient_id", as: "patient" });
        //associate with agreement
        this.belongsTo(models.Agreement, { foreignKey: "agreement_id", as: "agreement" });
    }
}

module.exports = Plan;
