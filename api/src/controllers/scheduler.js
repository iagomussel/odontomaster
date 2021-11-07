const Dentista = require("../models/Dentista");
const Consulta = require("../models/Consulta");
const Procedimento = require("../models/Procedimento");
const Paciente = require("../models/Paciente");
const moment = require('moment')

const { Op } = require("sequelize")
const SchedolerController = {
    async index(req, res) {
        const { data } = req.params;
        let dateObj = moment(data, "DD_MM_YYYY");

        let dados = await Dentista.findAll({
            include: [
                {
                    model: Consulta,
                    required: false,
                    as: "consulta",
                    nested: true,
                    where: {
                        horario: {
                            [Op.between]: [dateObj.startOf("Day").format(), dateObj.endOf("Day").format()]
                        }
                    },
                    include: { all: true, nested: true }
                }
            ]
        });


        return res.json(dados);
    },

    async store(req, res) {
        const {
            id,
            paciente,
            dentista,
            procedimento,
            data,
            horario,
            encaixe_id,

        } = req.body
        const procedimentoM = await Procedimento.findByPk(procedimento)
        const pacienteM = await Paciente.findByPk(paciente)
        var dentistaM = await Dentista.findByPk(dentista)
        consulta_generate = {};
        consulta_generate.horario = moment(data + "-" + horario, "DD/MM/YYYY-h:mm").toISOString()
        consulta_generate.horario_termino = moment(data + "-" + horario, "DD/MM/YYYY-h:mm").add(30, "minutes").toISOString()
        consulta_generate.encaixe_id = encaixe_id

        // return res.json(consulta_generate)

        const [consulta, consultaCreated] = await Consulta.findOrCreate({
            where: { id },
            defaults: consulta_generate
        })
        if (!consultaCreated) {
            consulta.horario = consulta_generate.horario
            consulta.horario_termino = consulta_generate.horario_termino
            consulta.save();
            let consultaEncaixe = await Consulta.findOne({ where: { encaixe_id: consulta.id } })
            if (consultaEncaixe) {
                consultaEncaixe.horario = consulta_generate.horario
                consultaEncaixe.horario_termino = consulta_generate.horario_termino
                consultaEncaixe.save();
            }
        }
        await consulta.setPaciente(pacienteM)
        await consulta.setDentista(dentistaM)
        await consulta.setProcedimento(procedimentoM)

        res.json(consulta);
    },
    async unschedule(req, res) {
        const { id } = req.params;

        const consulta = await Consulta.findOne({
            where: { id }
        })
        const consulta_encaixe = await Consulta.findOne({
            where: { encaixe_id: consulta.id }
        })
        if (consulta_encaixe) {
            consulta_encaixe.encaixe_id = null;
            consulta_encaixe.save()
        }
        if (await consulta.destroy()) {
            return res.json({ "status": "ok" })
        }
        return res.json({ "status": "someting wrong" })


    }
};
module.exports = SchedolerController;