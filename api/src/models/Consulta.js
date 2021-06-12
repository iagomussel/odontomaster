const { Model, DataTypes } = require("sequelize");

class Consulta extends Model {
  static init(sequelize){
    super.init(
      {
        horario: DataTypes.DATE,
        horario_termino: DataTypes.DATE,
        observacao: DataTypes.STRING,
        paciente_nome: DataTypes.STRING,
        paciente_telefone: DataTypes.STRING,
      },
      { sequelize, tableName:'consultas'}
    )

    }
    static associate(models){
      this.belongsTo(models.Paciente,{foreignKey:"paciente_id", as: "paciente"})
      this.belongsTo(models.Dentista,{foreignKey:"dentista_id", as: "dentista"})
      this.belongsTo(models.Procedimento,{foreignKey:"procedimento_id", as: "procedimento"})
    }
}

module.exports= Consulta;


