const Paciente = require("../models/Paciente");
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const moment = require("moment");
const whereLike = require("../utils/whereLike");

module.exports = {
  async index(req, res) {
    const {page, search} = req.params
    let pacientes = await Paciente.paginate({
      page: page || 1,
      paginate: 10,
      where: whereLike(Paciente, search),
    });
    return res.json(pacientes);
  },


  async ficha(req, res) {
    let ficha = await Paciente.max("ficha");
    res.json(ficha || 1);
  },
  async store(req, res) {
    let {
      ficha,
      nome,
      data_nasc,
      email,
      imagem,
      convenio_id,
      dentista_id,
      endereco,
      telefones,
    } = req.body;
    let data = moment(data_nasc, "DD/MM/YYYY");
    if (!data.isValid()) {
      data = moment();
    }

    if (ficha == "") {
      ficha = await Paciente.max("ficha");
      ficha += 1;
    }
    console.log(data);
    try {
      const paciente = await Paciente.create({
        ficha,
        nome,
        data_nasc: data.format("YYYY-MM-DD"),
        email,
        imagem,
        dentista_id,
        convenio_id,
      });

      let created_endereco = await Endereco.create(endereco);
      for (telefone in telefones) {
        let [created_telefone] = await Telefone.findOrCreate({
          where: { telefone: telefones[telefone] },
        });
        console.log(created_telefone);
        paciente.addTelefone(created_telefone);
      }

      await paciente.addEndereco(created_endereco);

      return res.json(paciente);
    } catch {
      return res.status(401).json({ erro: "Cadastro não realizado" });
    }
  },
};
