const { Model, DataTypes } = require("sequelize");
const moment = require("moment");

class Financial extends Model {
    static init(sequelize) {
        super.init(
            {
                tipo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "receita",
                },
                descricao: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                valor: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    defaultValue: 0,
                },
                data: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    get() {
                        return moment(this.getDataValue("data")).format("DD/MM/YYYY");
                    },
                },
                forma_pagamento: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "pendente",
                },
                observacao: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
            },
            { sequelize }
        );
    }

    static associate(models) {
        this.belongsTo(models.Patient, {
            foreignKey: "patient_id",
            as: "patient",
        });
        this.belongsTo(models.Professional, {
            foreignKey: "professional_id",
            as: "professional",
        });
        this.belongsTo(models.Consultation, {
            foreignKey: "consultation_id",
            as: "consultation",
        });
        this.belongsTo(models.Procedure, {
            foreignKey: "procedure_id",
            as: "procedure",
        });
    }
}

module.exports = Financial;
