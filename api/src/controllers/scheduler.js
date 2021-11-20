
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
            patient,
            professional,
            procedure,
            data,
            horario,
            encaixe_id,

        } = req.body

        let pacienteM = await Patient.findByPk(patient.id)
        let procedimentoM = await Procedure.findByPk(procedure.id)
        let dentistaM = await Professional.findByPk(professional.id)
        consulta_generate = {};
        consulta_generate.horario = moment(data + "-" + horario, "DD/MM/YYYY-h:mm").toISOString()
        consulta_generate.horario_termino = moment(data + "-" + horario, "DD/MM/YYYY-h:mm").add(30, "minutes").toISOString()
        consulta_generate.encaixe_id = encaixe_id


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
        await Promise.all([
            consulta.setPatient(pacienteM),
            consulta.setProfessional(dentistaM),
            consulta.setProcedure(procedimentoM)
        ])

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
        let dateObj = moment(date, "DDMMYYYY");
        let availableTimes = [];
        //get all consultations for the day
        let consultas = await Consultation.findAll({
            where: {
                professional_id: id,
                horario: {
                    [Op.between]: [dateObj.startOf("Day").format(), dateObj.endOf("Day").format()]
                }
            }
        })

        //get professional available Days
        let days = await Professional.findOne({
            attributes: ['availableDays'],
            where: { id },
        })

        let open = days.availableDays[dateObj.format("d")].open
        let close = days.availableDays[dateObj.format("d")].close

        // count minutes beetween to times
        let countMinutes = (time1, time2) => {
            let time1_moment = moment(time1, "HH:mm");
            let time2_moment = moment(time2, "HH:mm");
            return time2_moment.diff(time1_moment, "minutes");
        }

        for(let i=0; i<countMinutes(open,close); i+=30){
            let time = moment(open, "HH:mm").add(i, "minutes").format("HH:mm")
            //if not in consultas
            if(!consultas.find(consulta => consulta.horario == dateObj.format("DD/MM/YYYY")+"-"+time)){
                availableTimes.push(time)
            }

        }
        return res.json(availableTimes)


    },

    async availableDates(req, res) {
        const { id } = req.params;
        //generate list of dates from today to 20 days except weekends
        let dates = [];
        // get professional available days
        let availableDays = await Professional.findByPk(id, {
            attributes: ['availableDays']
        })
        for (let i = 0; i < 60; i++) {
            let date = moment().add(i, 'days').format('DD/MM/YYYY');
            let day = moment().add(i, 'days').format('d');
            if (availableDays.availableDays == null || availableDays.availableDays[day] != undefined){
                dates.push(date)
            }
        }
        return res.json(dates)
    }
};
module.exports = SchedolerController;