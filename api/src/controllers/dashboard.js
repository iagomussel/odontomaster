
const {
    Patient,
    Consultation
} = require('../models');


module.exports = {

    async index(req, res) {
        result = {
            status: 'success',
            data: {

            }
        }

        /* get patient count */
        result.data.patientCount = await Patient.count();

        /** get Consultation count */
        result.data.consultationCount = await Consultation.count({
            where: {
                status: 'active'
            }
        });

        /** get canceled Consultations */
        result.data.canceledConsultationCount = await Consultation.count({
            where: {
                status: 'canceled'
            }
        })


    }

};
