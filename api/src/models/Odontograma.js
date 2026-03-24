const { Model, DataTypes } = require("sequelize");
const moment = require("moment");

class Odontograma extends Model {
    static init(sequelize) {
        super.init(
            {
                dente: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    comment: "Numero do dente (notacao FDI: 11-18, 21-28, 31-38, 41-48)",
                },
                face: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    comment: "Face do dente: V(estibular), L(ingual/Palatina), M(esial), D(istal), O(clusal/Incisal)",
                },
                condicao: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "higido",
                    comment: "higido, cariado, restaurado, ausente, fraturado, implante, endodontia, protese, selante, em_tratamento",
                },
                observacao: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                data_registro: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    get() {
                        return moment(this.getDataValue("data_registro")).format("DD/MM/YYYY");
                    },
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
        this.belongsTo(models.Procedure, {
            foreignKey: "procedure_id",
            as: "procedure",
        });
    }
}

module.exports = Odontograma;
