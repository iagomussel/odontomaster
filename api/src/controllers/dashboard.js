patient = require('../models/patient');
consultation = require('../models/consultation');


module.exports = {

    async index(req, res) {
        result = {
            status: 'success',
            data: {

            }
        }

        /* get patient count */
        result.data.patientCount = await patient.count();

        /** get Consultation count */
        result.data.consultationCount = await consultation.count({
            where: {
                status: 'active'
            }
        });

        /** get canceled Consultations */
        result.data.canceledConsultationCount = await consultation.count({
            where: {
                status: 'canceled'
            }
        })

        
    }

};
