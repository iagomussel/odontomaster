const {
    Professional,
    User
} = require("../models");

const WhereLike = require("../utils/whereLike");
const passwordHash = require("password-hash");
const Constants = require("../utils/Constants");

module.exports = {
    async index(req, res) {
        const { page, search } = req.params;
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1
        if (realpage == 0) realpage++

        let dentistas = await Professional.paginate({
            page: realpage,
            paginate: 10,
            where: WhereLike(Professional, search),
        });
        return res.json(dentistas);
    },
    async find(req, res) {
        let dentista = await Professional.findByPk(req.params.id);
        res.json(dentista);
    },
    async store(req, res) {
        let { id, nome, imagem, availableDays } = req.body;
        if (imagem == "" || imagem == null) imagem = Constants.IMAGE_DEFAULT
        if (availableDays == "" || availableDays == null) availableDays = Constants.AVAILABLE_DAYS
        let user;
        let [dentista, dentistaCreated] = await Professional.findOrCreate(
            {
                where: { id: (id ? id : null) },
                defaults: { nome, imagem, availableDays }
            });

        if (dentistaCreated) {
            user = await User.create({
                username: nome,
                password: passwordHash.generate(Constants.PASSWORD_DEFAULT),
            });
        } else {

            user = await User.findOne(
                { where: { id: dentista.user_id } }
            )
            if (!user) {
                user = await User.create({
                    username: nome,
                    password: passwordHash.generate(Constants.PASSWORD_DEFAULT),
                });
            } else {
                console.log(user)
                user.username = nome;
                user.save()
            }


            dentista.nome = nome;
            dentista.imagem = imagem;
            dentista.availableDays = availableDays
            dentista.save();
        }
        dentista.setUser(user);

        return res.json(dentista);

    },
};
