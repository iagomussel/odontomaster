const Consulta = require("../models/Consulta");
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
/*
    let {
      ficha,
      nome,
      data_nasc,
      email,
      imagem,
      convenio,
      n_associado,
      dentista,
      endereco,
      telefones,
      observacoes,
    } = req.body;

    if (ficha==""){
        ficha = await Paciente.max('ficha');
        ficha+=1;
    }



    try {
      const paciente = Paciente.create({
        ficha,
        nome,
        data_nasc,
        email,
        imagem,
        endereco,
        telefones,
      });
      return res.json(paciente);
    } catch {
      return res.status(401).json({ erro: "Cadastro não realizado" });
    }*/
  },
};
