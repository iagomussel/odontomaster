const { Model, DataTypes } = require("sequelize");
const moment = require("moment");

class Anamnese extends Model {
    static init(sequelize) {
        super.init(
            {
                // Dados gerais de saude
                esta_em_tratamento_medico: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                tratamento_medico_descricao: DataTypes.TEXT,
                esta_tomando_medicamento: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                medicamento_descricao: DataTypes.TEXT,
                possui_alergia: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                alergia_descricao: DataTypes.TEXT,
                // Condicoes medicas
                diabetes: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                hipertensao: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                problemas_cardiacos: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                problemas_respiratorios: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                problemas_renais: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                problemas_hepaticos: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                problemas_gastrointestinais: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                problemas_articulares: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                disturbios_sanguineos: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                epilepsia: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                hiv_positivo: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                hepatite: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                // Habitos
                fumante: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                consumo_alcool: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                bruxismo: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                // Saude bucal
                sangramento_gengival: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                sensibilidade_dental: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                dor_atm: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                // Mulheres
                gestante: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                lactante: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                // Campos livres
                cirurgias_anteriores: DataTypes.TEXT,
                observacoes: DataTypes.TEXT,
                // Controle
                data_preenchimento: {
                    type: DataTypes.DATE,
                    get() {
                        return moment(this.getDataValue('data_preenchimento')).format('DD/MM/YYYY');
                    }
                },
            },
            { sequelize }
        );
    }

    static associate(models) {
        this.belongsTo(models.Patient, { foreignKey: "patient_id", as: "patient" });
    }
}

module.exports = Anamnese;
