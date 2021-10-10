const Dentista = require("../models/Dentista");
const User = require("../models/User");
const WhereLike = require("../utils/whereLike");
const passwordHash = require("password-hash");
const Constants = require("../utils/Constants")

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
    async find(req, res) {
        let dentista = await Dentista.findByPk(req.params.id);
        res.json(dentista);
    },
    async store(req, res) {
        let { id, nome, imagem } = req.body;
        if (imagem == "" || imagem == null) imagem = Constants.IMAGE_DEFAULT
        let user;
        let [dentista, dentistaCreated] = await Dentista.findOrCreate(
            {
                where: { id: (id ? id : null) },
                defaults: { nome, imagem }
            });

        if (dentistaCreated) {
            user = await User.create({
                username: nome,
                password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
            });
        } else {
            console.log(dentista)
            user = await User.findOne(
                { where: { id: dentista.user_id } }
            )
            if (!user) {
                user = await User.create({
                    username: nome,
                    password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
                });
            } else {
                console.log(user)
                user.username = nome;
                user.save()
            }


            dentista.nome = nome;
            dentista.imagem = imagem;
            dentista.save();
        }
        dentista.setUser(user);

        return res.json(dentista);

    },
};
