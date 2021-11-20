
const moment = require('moment')
const {
    Professional,
    Consultation,
    Procedure,
    Patient,

} = require("../models")

const { Op } = require("sequelize")
const SchedolerController = {
    async index(req, res) {
        const { data } = req.params;
        let dateObj = moment(data, "DD_MM_YYYY");

        let dados = await Professional.findAll({
            include: [
                {
                    model: Consultation,
                    required: false,
                    as: "consultation",
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
        const procedimentoM = await Procedure.findByPk(procedimento)
        const pacienteM = await Patient.findByPk(paciente)
        var dentistaM = await Professional.findByPk(dentista)
        consulta_generate = {};
        consulta_generate.horario = moment(data + "-" + horario, "DD/MM/YYYY-h:mm").toISOString()
        consulta_generate.horario_termino = moment(data + "-" + horario, "DD/MM/YYYY-h:mm").add(30, "minutes").toISOString()
        consulta_generate.encaixe_id = encaixe_id

        // return res.json(consulta_generate)

        const [consulta, consultaCreated] = await Consultation.findOrCreate({
            where: { id },
            defaults: consulta_generate
        })
        if (!consultaCreated) {
            consulta.horario = consulta_generate.horario
            consulta.horario_termino = consulta_generate.horario_termino
            consulta.save();
            let consultaEncaixe = await Consultation.findOne({ where: { encaixe_id: consulta.id } })
            if (consultaEncaixe) {
                consultaEncaixe.horario = consulta_generate.horario
                consultaEncaixe.horario_termino = consulta_generate.horario_termino
                consultaEncaixe.save();
            }
        }
        await consulta.setPatient(pacienteM)
        await consulta.setProfessional(dentistaM)
        await consulta.setProcedure(procedimentoM)

        res.json(consulta);
    },
    async unschedule(req, res) {
        const { id } = req.params;

        const consulta = await Consultation.findOne({
            where: { id }
        })
        const consulta_encaixe = await Consultation.findOne({
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


    },

    async availableTimes(req, res) {
        const { id, date } = req.params;
    },

    async availableDates(req, res) {
        const { id } = req.params;

        //generate list of dates from today to 20 days except weekends
        let dates = [];
        // get professional available days
        let availableDays = await Professional.findByPk(id, {
            attributes: ['available_days']
        })
        for (let i = 0; i < 20; i++) {
            let date = moment().add(i, 'days').format('DD/MM/YYYY');
            let day = moment().add(i, 'days').format('dddd');
        }
    }
};
module.exports = SchedolerController;