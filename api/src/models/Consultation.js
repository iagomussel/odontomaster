const { Model, DataTypes } = require("sequelize");
const moment = require("moment");
class Consulta extends Model {
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
        this.belongsTo(models.Paciente, { foreignKey: "paciente_id", as: "paciente" })
        this.belongsTo(models.Dentista, { foreignKey: "dentista_id", as: "dentista" })
        this.belongsTo(models.Procedimento, { foreignKey: "procedimento_id", as: "procedimento" })
        this.hasOne(models.Consulta, { foreignKey: "encaixe_id", as: "encaixe" })
    }
}

module.exports = Consulta;


