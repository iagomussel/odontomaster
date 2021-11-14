const Procedimento = require("../models/Procedure");
const WhereLike = require("../utils/whereLike");


module.exports = {
    async index(req, res) {
        const { page, search } = req.params;
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1
        if (realpage == 0) realpage++
        console.log("page ==>" + realpage)
        let procedimentos = await Procedimento.paginate({
            page: realpage,
            paginate: 10,
            where: WhereLike(Procedimento, search),
        });
        return res.json(procedimentos);
    },

    async store(req, res) {
        let {
            nome,
            valor,
            duracao,
            periodicidade
        } = req.body;

        //check parameters for procedimento creation
        if (!nome || !valor || !duracao || !periodicidade) {

            return res.status(400).json({ error: "é necessario informar todos os dados" });
        }


        let procedimentos = await Procedimento.create({
            nome,
            valor,
            duracao,
            periodicidade
        });

        //check fields and return error
        if (!procedimentos) {
            return res.status(400).json({ error: "Procedimento não cadastrado" });
        }

        return res.json(procedimentos);

    },
};
