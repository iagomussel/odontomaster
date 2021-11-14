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
        this.belongsTo(models.Professional, { as: "professional" });
        this.belongsTo(models.Agreements, { as: "agreements" });
        this.belongsToMany(models.Addresses, {
            through: "patient_addresses",
            as: "Addresses",
        });
        this.belongsToMany(models.Phones, {
            through: "patient_phones",
            as: "Phones",
        });
        this.hasMany(models.Obs, { foreignKey: "patient_id", as: "obs" })
    }
}

module.exports = Patient;
