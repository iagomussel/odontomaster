const { Model, DataTypes } = require("sequelize");
const moment = require('moment');
class Patient extends Model {
    static init(sequelize) {
        super.init(
            {
                ficha: DataTypes.BIGINT,

                nome: DataTypes.STRING,
                data_nasc: {
                    type: DataTypes.DATE,
                    get() {
                        return moment(this.getDataValue('data_nasc')).format('DD/MM/YYYY');
                    }
                },
                sexo: DataTypes.STRING,
                email: DataTypes.STRING,
                imagem: DataTypes.STRING,
                n_associado: DataTypes.STRING,
            },
            { sequelize }
        );

    }

    static associate(models) {
        this.hasMany(models.Consultation,
             { foreignKey: 'paciente_id', as: 'consultations' }
        );

        this.belongsToMany(
            models.Professional,
             {through:"patient_professionals", as: "professionals" });
        this.belongsToMany(
            models.Agreement,
            {through:"patient_agreements", as: "agreements" });
        this.belongsToMany(models.Addresses, {
            through: "patient_addresses",
            as: "addresses",
        });
        this.belongsToMany(models.Phones, {
            through: "patient_phones",
            as: "phones",
        });
        this.hasMany(models.Obs, { foreignKey: "patient_id", as: "obs" })
        this.hasMany(models.Plan, { foreignKey: "patient_id", as: "plans" })


    }
}

module.exports = Patient;
