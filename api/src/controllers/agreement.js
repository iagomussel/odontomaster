const {Agreement} = require("../models");
const WhereLike = require("../utils/whereLike");
module.exports = {
    async index(req, res) {
        const { page, search } = req.params;
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1
        if (realpage == 0) realpage++
        let convenios = await Agreement.paginate({
            page: realpage,
            paginate: 10,
            where: WhereLike(Agreement, search),
        });
        return res.json(convenios);
    },
    async find(req, res) {
        let convenio = await Agreement.findByPk(req.params.id);
        res.json(convenio);
    },
    async store(req, res) {
        let { id, nome } = req.body;

        let [convenio, convenioCreated] = await Agreement.findOrCreate(
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
