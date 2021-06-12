const Procedimento = require("../models/Procedimento");
const WhereLike = require("../utils/WhereLike");


module.exports = {
  async index(req, res) {
     const { page, search } = req.params;
     let procedimentos = await Procedimento.paginate({
       page: page | 1,
       paginate: 10,
       where: WhereLike(Procedimento, search),
     });
     return res.json(procedimentos);
  },

  async store(req, res) {
    let { nome } = req.body;
      let procedimentos = await Procedimento.create({
        nome,
      });
      return res.json(procedimentos);
   
  },
};
