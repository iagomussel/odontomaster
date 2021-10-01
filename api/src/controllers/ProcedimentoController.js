const Procedimento = require("../models/Procedimento");
const WhereLike = require("../utils/whereLike");


module.exports = {
  async index(req, res) {
     const { page, search } = req.params;
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1
        if (realpage == 0) realpage++
        console.log("page ==>"+realpage)
     let procedimentos = await Procedimento.paginate({
       page: realpage,
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
