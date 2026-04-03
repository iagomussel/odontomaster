const { Anamnese, Patient } = require("../models");
const moment = require("moment");

module.exports = {
    async index(req, res) {
        const { patient_id } = req.params;
        let anamneses = await Anamnese.findAll({
            where: { patient_id },
            order: [['createdAt', 'DESC']],
            include: [{ model: Patient, as: 'patient', attributes: ['id', 'nome'] }]
        });
        return res.json(anamneses);
    },

    async find(req, res) {
        const { id } = req.params;
        let anamnese = await Anamnese.findByPk(id, {
            include: [{ model: Patient, as: 'patient', attributes: ['id', 'nome'] }]
        });
        if (!anamnese) {
            return res.status(404).json({ error: "Anamnese não encontrada" });
        }
        return res.json(anamnese);
    },

    async store(req, res) {
        const { patient_id } = req.params;
        const patient = await Patient.findByPk(patient_id);
        if (!patient) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }

        const dados = {
            ...req.body,
            patient_id,
            data_preenchimento: moment().format("YYYY-MM-DD")
        };

        const { id } = req.body;
        if (id) {
            const anamnese = await Anamnese.findByPk(id);
            if (!anamnese) {
                return res.status(404).json({ error: "Anamnese não encontrada" });
            }
            await anamnese.update(dados);
            return res.json(anamnese);
        }

        const anamnese = await Anamnese.create(dados);
        return res.json(anamnese);
    },

    async destroy(req, res) {
        const { id } = req.params;
        const anamnese = await Anamnese.findByPk(id);
        if (!anamnese) {
            return res.status(404).json({ error: "Anamnese não encontrada" });
        }
        await anamnese.destroy();
        return res.json({ status: "ok" });
    }
};
