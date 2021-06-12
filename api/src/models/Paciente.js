const { Model, DataTypes } = require("sequelize");

class Paciente extends Model {
  static init(sequelize) {
    super.init(
      {
        ficha: DataTypes.BIGINT,
        nome: DataTypes.STRING,
        data_nasc: DataTypes.DATE,
        sexo: DataTypes.STRING,
        email: DataTypes.STRING,
        imagem: DataTypes.STRING,
      },
      { sequelize }
    );
    
  }

  static associate(models) {
    this.belongsTo(models.Dentista,{as: "dentista"});
    this.belongsToMany(models.Endereco, {
      through: "pacientes_enderecos",
      as: "enderecos",
    });
    this.belongsToMany(models.Telefone, {
      through: "pacientes_telefones",
      as: "telefones",
    });
  }
}

module.exports = Paciente;
