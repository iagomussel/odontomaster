const Dentista = require("../models/Dentista");
const User= require("../models/User");
const WhereLike = require("../utils/WhereLike");
const passwordHash = require("password-hash");

module.exports = {
  async index(req, res) {
       const { page, search } = req.params;
       let dentistas = await Dentista.paginate({
         page: page | 1,
         paginate: 10,
         where: WhereLike(Dentista, search),
       });
       return res.json(dentistas);
  },

  async store(req, res) {
    let { nome } = req.body;


      let user = await User.create({
        username: nome,
        password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
      });
      console.log(user);
      
      let dentista = await Dentista.create({ nome, imagem: "teste", user_id: user.id });
      return res.json(dentista);
   
  },
};
