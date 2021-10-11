const { Model, DataTypes } = require("sequelize");
const moment = require('moment');
class Paciente extends Model {
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
    this.belongsTo(models.Dentista, { as: "dentista" });
    this.belongsTo(models.Convenio, { as: "convenio" });
    this.belongsToMany(models.Endereco, {
      through: "pacientes_enderecos",
      as: "enderecos",
    });
    this.belongsToMany(models.Telefone, {
      through: "pacientes_telefones",
      as: "telefones",
    });
    this.hasMany(models.Observacoes, { foreignKey: "paciente_id", as: "observacoes" })
  }
}

module.exports = Paciente;
