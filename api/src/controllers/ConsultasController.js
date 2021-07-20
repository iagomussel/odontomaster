const Dentista = require("../models/Dentista");
const Consulta = require("../models/Consulta");
const Procedimento = require("../models/Procedimento");
const Paciente = require("../models/Paciente");
const moment = require('moment')
module.exports = {
    async index(req, res) {

        let dados = await Dentista.findAll({
            include: { all: true, nested: true }
        });
        return res.json(dados);
    },

    async store(req, res) {
        const {
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

        const consulta = await Consulta.create(consulta_generate)
        await consulta.setPaciente(pacienteM)
        await consulta.setDentista(dentistaM)
        await consulta.setProcedimento(procedimentoM)
        res.json(consulta);
    },
};
