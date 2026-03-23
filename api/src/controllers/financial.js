const { Financial } = require("../models");
const WhereLike = require("../utils/whereLike");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        const { page, search } = req.params;
        let realpage = page ? page : 1;
        if (realpage == NaN) realpage = 1;
        if (realpage == 0) realpage++;

        let where = WhereLike(Financial, search);

        if (req.query.inicio && req.query.fim) {
            let inicio = moment(req.query.inicio, "DD-MM-YYYY").startOf("day");
            let fim = moment(req.query.fim, "DD-MM-YYYY").endOf("day");
            where.data = { [Op.between]: [inicio.format(), fim.format()] };
        }

        if (req.query.tipo) {
            where.tipo = req.query.tipo;
        }

        let financials = await Financial.paginate({
            page: realpage,
            paginate: 10,
            where,
            include: ["patient", "professional", "procedure"],
            order: [["data", "DESC"]],
        });
        return res.json(financials);
    },

    async find(req, res) {
        const { id } = req.params;
        let financial = await Financial.findByPk(id, {
            include: { all: true, nested: true },
        });

        if (!financial) {
            return res.status(400).json({ error: "Lançamento não encontrado" });
        }
        return res.json(financial);
    },

    async store(req, res) {
        let {
            id,
            tipo,
            descricao,
            valor,
            data,
            forma_pagamento,
            status,
            observacao,
            patient_id,
            professional_id,
            consultation_id,
            procedure_id,
        } = req.body;

        if (!descricao || !valor || !data || !tipo) {
            return res
                .status(400)
                .json({ error: "É necessário informar descrição, valor, data e tipo" });
        }

        let dataFormatted = moment(data, "DD/MM/YYYY");
        if (!dataFormatted.isValid()) {
            dataFormatted = moment();
        }

        const financialData = {
            tipo,
            descricao,
            valor,
            data: dataFormatted.format("YYYY-MM-DD"),
            forma_pagamento,
            status: status || "pendente",
            observacao,
            patient_id: patient_id || null,
            professional_id: professional_id || null,
            consultation_id: consultation_id || null,
            procedure_id: procedure_id || null,
        };

        if (id) {
            let financial = await Financial.findByPk(id);
            if (!financial) {
                return res.status(400).json({ error: "Lançamento não encontrado" });
            }
            await financial.update(financialData);
            return res.json(financial);
        }

        let financial = await Financial.create(financialData);
        return res.json(financial);
    },

    async summary(req, res) {
        let where = {};

        if (req.query.inicio && req.query.fim) {
            let inicio = moment(req.query.inicio, "DD-MM-YYYY").startOf("day");
            let fim = moment(req.query.fim, "DD-MM-YYYY").endOf("day");
            where.data = { [Op.between]: [inicio.format(), fim.format()] };
        } else {
            where.data = {
                [Op.between]: [
                    moment().startOf("month").format(),
                    moment().endOf("month").format(),
                ],
            };
        }

        let receitas = await Financial.sum("valor", {
            where: { ...where, tipo: "receita" },
        });

        let despesas = await Financial.sum("valor", {
            where: { ...where, tipo: "despesa" },
        });

        receitas = receitas || 0;
        despesas = despesas || 0;

        return res.json({
            receitas: parseFloat(receitas).toFixed(2),
            despesas: parseFloat(despesas).toFixed(2),
            saldo: (receitas - despesas).toFixed(2),
        });
    },
};
