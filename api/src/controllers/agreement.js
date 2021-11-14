const Convenio = require("../models/Agreements");
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
    async find(req, res) {
        let convenio = await Convenio.findByPk(req.params.id);
        res.json(convenio);
    },
    async store(req, res) {
        let { id, nome } = req.body;

        let [convenio, convenioCreated] = await Convenio.findOrCreate(
            {
                where: { id: (id ? id : null) },
                defaults: { nome }
            });
        if (!convenioCreated) {
            convenio.nome = nome
            convenio.save();
        }
        return res.json(convenio);
    },
};
