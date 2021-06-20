const Dentista = require("../models/Dentista");
const User= require("../models/User");
const WhereLike = require("../utils/WhereLike");
const passwordHash = require("password-hash");

module.exports = {
  async index(req, res) {
       const { page, search } = req.params;
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1
        if (realpage == 0) realpage++

       let dentistas = await Dentista.paginate({
         page: realpage,
         paginate: 10,
         where: WhereLike(Dentista, search),
       });
       return res.json(dentistas);
  },

  async store(req, res) {
    let { nome, imagem } = req.body;


      let user = await User.create({
        username: nome,
        password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
      });

      let dentista = await Dentista.create({ nome, imagem, user_id: user.id });
      return res.json(dentista);

  },
};
