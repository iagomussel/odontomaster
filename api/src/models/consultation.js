const { Model, DataTypes } = require("sequelize");
const moment = require("moment");
class Consultation extends Model {
    static init(sequelize) {
        super.init(
            {
                horario: {type:DataTypes.DATE,
                    get() {
                        return moment(this.getDataValue('horario')).format('HH:mm');
                    }
                },
                horario_termino: {
                    type: DataTypes.DATE,
                    get() {
                        return moment(this.getDataValue('horario_termino')).format('HH:mm');
                    }
                },
                observacao: DataTypes.STRING,
                paciente_nome: DataTypes.STRING,
                paciente_telefone: DataTypes.STRING,
            },
            { sequelize, tableName: 'consultas' }
        )

    }
    static associate(models) {
        this.belongsTo(models.Patient, { foreignKey: "patient_id", as: "patient" })
        this.belongsTo(models.Professional, { foreignKey: "professional_id", as: "professional" })
        this.belongsTo(models.Procedure, { foreignKey: "procedure_id", as: "procedure" })
        this.hasOne(models.Consultation, { foreignKey: "fitting_id", as: "fitting" })
    }
}

module.exports = Consultation;


