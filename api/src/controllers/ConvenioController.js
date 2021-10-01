const Convenio = require("../models/Convenio");
const WhereLike = require("../utils/whereLike");
module.exports = {
  async index(req, res) {
    const { page, search } = req.params;
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1
        if (realpage == 0) realpage++
    let convenios = await Convenio.paginate({
        page: realpage,
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
