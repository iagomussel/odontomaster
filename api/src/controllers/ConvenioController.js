const Convenio = require("../models/Convenio");
const WhereLike = require("../utils/WhereLike");
module.exports = {
  async index(req, res) {
    const { page, search } = req.params;
    let convenios = await Convenio.paginate({
      page: page || 1,
      paginate: 10,
      where: WhereLike(Convenio, search),
    });
    return res.json(convenios);
  },
  async store(req, res) {
    let { nome } = req.body;
    let convenio = await Convenio.create({
      nome,
    });
    return res.json(convenio);
  },
};
