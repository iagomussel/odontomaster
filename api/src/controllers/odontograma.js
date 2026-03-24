const { Odontograma, Patient, Professional, Procedure } = require("../models");
const moment = require("moment");

const includeAssociations = [
    { model: Patient, as: "patient", attributes: ["id", "nome"] },
    { model: Professional, as: "professional", attributes: ["id", "nome"] },
    { model: Procedure, as: "procedure", attributes: ["id", "nome"] },
];

module.exports = {
    async index(req, res) {
        const { patient_id } = req.params;
        const registros = await Odontograma.findAll({
            where: { patient_id },
            order: [["data_registro", "DESC"]],
            include: includeAssociations,
        });
        return res.json(registros);
    },

    async current(req, res) {
        const { patient_id } = req.params;

        // Get latest record per tooth (current state)
        const registros = await Odontograma.findAll({
            where: { patient_id },
            include: includeAssociations,
            order: [["data_registro", "DESC"]],
        });

        // Group by tooth+face, keep only latest
        const currentMap = {};
        for (const reg of registros) {
            const key = `${reg.dente}_${reg.face || "geral"}`;
            if (!currentMap[key]) {
                currentMap[key] = reg;
            }
        }

        return res.json(Object.values(currentMap));
    },

    async find(req, res) {
        const { id } = req.params;
        const registro = await Odontograma.findByPk(id, {
            include: includeAssociations,
        });
        if (!registro) {
            return res.status(404).json({ error: "Registro nao encontrado" });
        }
        return res.json(registro);
    },

    async store(req, res) {
        const { patient_id } = req.params;
        const patient = await Patient.findByPk(patient_id);
        if (!patient) {
            return res.status(404).json({ error: "Paciente nao encontrado" });
        }

        const dados = {
            ...req.body,
            patient_id,
            data_registro: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        const { id } = req.body;
        if (id) {
            const registro = await Odontograma.findByPk(id);
            if (!registro) {
                return res.status(404).json({ error: "Registro nao encontrado" });
            }
            await registro.update(dados);
            return res.json(registro);
        }

        const registro = await Odontograma.create(dados);
        return res.json(registro);
    },

    async storeBatch(req, res) {
        const { patient_id } = req.params;
        const patient = await Patient.findByPk(patient_id);
        if (!patient) {
            return res.status(404).json({ error: "Paciente nao encontrado" });
        }

        const { dentes } = req.body;
        if (!Array.isArray(dentes) || dentes.length === 0) {
            return res.status(400).json({ error: "Nenhum dente informado" });
        }

        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        const registros = await Odontograma.bulkCreate(
            dentes.map((d) => ({
                ...d,
                patient_id,
                data_registro: now,
            }))
        );

        return res.json(registros);
    },

    async destroy(req, res) {
        const { id } = req.params;
        const registro = await Odontograma.findByPk(id);
        if (!registro) {
            return res.status(404).json({ error: "Registro nao encontrado" });
        }
        await registro.destroy();
        return res.json({ status: "ok" });
    },

    async history(req, res) {
        const { patient_id, dente } = req.params;
        const registros = await Odontograma.findAll({
            where: { patient_id, dente },
            order: [["data_registro", "DESC"]],
            include: includeAssociations,
        });
        return res.json(registros);
    },
};
