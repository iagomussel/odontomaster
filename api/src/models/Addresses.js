const { Model, DataTypes } = require("sequelize");

class Addresses extends Model {
    static init(sequelize) {
        super.init(
            {
                logradouro: DataTypes.STRING,
                numero: DataTypes.STRING,
                complemento: DataTypes.STRING,
                bairro: DataTypes.STRING,
                cidade: DataTypes.STRING,
                uf: { type: DataTypes.STRING },
                cep: { type: DataTypes.STRING },
            },
            {
                sequelize,
            }
        );
    }
    static associate(models) {
        this.belongsToMany(models.Patient, {
            through: "patient_addresses",
            as: "patients" });
    }
}

module.exports = Addresses;


