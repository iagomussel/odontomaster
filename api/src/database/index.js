const { Sequelize, Model, DataTypes } = require("sequelize");
const connectionConfig = require("../config/database");

const sequelizePaginate = require("sequelize-paginate");

const sequelize = new Sequelize(connectionConfig);
//# import models

const Users = require("../models/User");
const Pacientes = require("../models/Paciente");
const Consulta = require("../models/Consulta");
const Dentista = require("../models/Dentista");
const Procedimento = require("../models/Procedimento");
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const Convenio = require("../models/Convenio");

//inits
Users.init(sequelize);
Pacientes.init(sequelize);
Dentista.init(sequelize);
Consulta.init(sequelize);
Procedimento.init(sequelize);
Convenio.init(sequelize);
Endereco.init(sequelize);
Telefone.init(sequelize);



sequelizePaginate.paginate(Users);
sequelizePaginate.paginate(Pacientes);
sequelizePaginate.paginate(Dentista);
sequelizePaginate.paginate(Consulta);
sequelizePaginate.paginate(Procedimento);
sequelizePaginate.paginate(Convenio);




//associations
for (model in sequelize.models) {
  if (sequelize.models[model].associate != undefined)
    sequelize.models[model].associate(sequelize.models);

}




module.exports = sequelize;

