const {
    Consultation,
    Patient,
    Professional,
    Procedure,
    Evolution,
} = require("../models");

const { Op } = require("sequelize");
const moment = require("moment");

module.exports = {
    async index(req, res) {
        const { patient_id } = req.params;

        const consultations = await Consultation.findAll({
            where: { patient_id },
            include: [
                { model: Professional, as: "professional", attributes: ["id", "nome"] },
                { model: Procedure, as: "procedure", attributes: ["id", "nome", "valor"] },
                { model: Evolution, as: "evolutions", include: [
                    { model: Professional, as: "professional", attributes: ["id", "nome"] }
                ]},
            ],
            order: [["horario", "DESC"]],
        });

        return res.json(consultations);
    },

    async storeEvolution(req, res) {
        const { consultation_id } = req.params;
        const { id, descricao, tipo, professional_id } = req.body;

        const consultation = await Consultation.findByPk(consultation_id);
        if (!consultation) {
            return res.status(404).json({ error: "Consulta não encontrada" });
        }

        if (id) {
            const evolution = await Evolution.findByPk(id);
            if (!evolution) {
                return res.status(404).json({ error: "Evolução não encontrada" });
            }
            evolution.descricao = descricao;
            evolution.tipo = tipo || "evolucao";
            if (professional_id) evolution.professional_id = professional_id;
            await evolution.save();
            return res.json(evolution);
        }

        const evolution = await Evolution.create({
            descricao,
            tipo: tipo || "evolucao",
            consultation_id,
            professional_id: professional_id || null,
            data_registro: new Date(),
        });

        return res.json(evolution);
    },

    async destroyEvolution(req, res) {
        const { id } = req.params;
        const evolution = await Evolution.findByPk(id);
        if (!evolution) {
            return res.status(404).json({ error: "Evolução não encontrada" });
        }
        await evolution.destroy();
        return res.json({ status: "ok" });
    },
};
