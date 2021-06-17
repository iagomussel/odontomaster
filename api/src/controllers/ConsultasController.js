const Dentista = require("../models/Dentista");

module.exports = {
  async index(req, res) {

    let dados = await Dentista.findAll({
      include:'consulta'
    });
    return res.json(dados);
  },

  async store(req, res) {
      res.json({status:"ok"});
  },
};
