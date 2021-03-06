
const {
    Patient,
    Consultation,
    Professional
} = require('../models');

const { Op } = require("sequelize")
const moment = require("moment");

module.exports = {

    async index(req, res) {
        const cards = [];

        /* get patient count */
        let patientCount = await Patient.count();

        cards.push({
            title: 'Pacientes',
            icon: 'users',
            value: patientCount,
            color: 'blue'
        });

        /** get Consultation count */
        let consultationCount = await Consultation.count({

        });

        cards.push({
            title: 'Consultas',
            icon: 'stethoscope',
            value: consultationCount,
            color: 'green'
        });

        /** get canceled Consultations */
        let canceledConsultationCount = await Consultation.count({
            where: {
                status: 'canceled'
            }
        })

        cards.push({
            title: 'Consultas canceladas',
            icon: 'stethoscope',
            value: canceledConsultationCount,
            color: 'red'
        });

        /** get avalable times on the week */
        let scheduledTimes = await Consultation.count({
            where: {
                horario: {
                    [Op.between]: [moment().startOf('week').format('YYYY-MM-DD'), moment().endOf('week').format('YYYY-MM-DD')]
                }
            }
        })

        /** get professional count */
        let professionalCount = await Professional.count({});

        let totalTimes = professionalCount * 5/** days on week */ * 8/** hours on day to work */;
        //return res.json(totalTimes);
        let percentageAvailableTimes = 100 - (scheduledTimes / totalTimes) * 100;

        cards.push({
            title: 'Horários disponíveis',
            icon: 'clock',
            value: percentageAvailableTimes.toFixed(2) + '%',
            color: 'yellow'
        });
        res.json(cards);
    }

};
