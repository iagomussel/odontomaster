// require models
const {
    Patient,
    Professional,
    User,
    Addresses,
    Phones,
    Agreement
} = require("../models");


const moment = require("moment");
const whereLike = require("../utils/whereLike");
const passwordHash = require("password-hash");
const Constants = require("../utils/Constants");


module.exports = {
    async index(req, res) {
        const { page, search } = req.params
        let realpage = (page ? page : 1)
        if (realpage == NaN) realpage = 1

        if (realpage == 0) realpage++
        let patients = await Patient.paginate({
            page: realpage,
            paginate: 10,
            where: whereLike(Patient, search),
            include: ['addresses', 'phones', "professionals", 'agreements']

        });
        return res.json(patients);
    },


    async find(req, res) {
        let patient = await Patient.findByPk(req.params.id, {
            include: ['addresses', 'phones', "professionals", 'agreements']
        });
        res.json(patient);
    },
    async ficha(req, res) {
        let ficha = await Patient.max("ficha");
        res.json(ficha ? (ficha + 1) : 1);
    },
    async store(req, res) {
        let {
            id,
            ficha,
            nome,
            data_nasc,
            sexo,
            email,
            imagem,
            convenioId,
            dentistaId,
            addresses,
            phones,
            n_associado,
        } = req.body;
        if (imagem == "" || imagem == null) imagem = Constants.IMAGE_DEFAULT


        const createdPhones = []
        const createdAddresses = [];

        let data = moment(data_nasc, "DD/MM/YYYY");
        if (!data.isValid()) {
            data = moment();
        }

        if (ficha == "") {
            ficha = await Patient.max("ficha");
            ficha += 1;
        }
        /* dentista create on register patient */
        let dentista = await Professional.findOne({
            where: Number.isInteger(dentistaId) ? { id: dentistaId } : { nome: dentistaId }
        })
        if (!dentista) {
            let _nome = dentistaId;
            let imagem = Constants.IMAGE_DEFAULT;
            let user = await User.create({
                username: nome,
                password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
            });

            dentista = await Professional.create({ nome: _nome, imagem, user_id: user.id });
        }


        /*convenio create on register patient */
        let convenio;
        if (convenioId == null || convenioId == "") {
            convenio = await Agreement.findOne({
                where: {
                    default: true
                }
            })
        } else {
            convenio = await Agreement.findOne({
                where: Number.isInteger(convenioId) ? { id: convenioId } : { nome: convenioId }
            })
        }

        if (!convenio) {

            let _nome = convenioId;
            convenio = await Agreement.create({ nome: _nome });
        }

        const [patient, patientCreated] = await Patient.findOrCreate({
            where: { id },
            defaults: {
                ficha,
                nome,
                data_nasc: data.format("YYYY-MM-DD"),
                email,
                sexo,
                imagem,
                n_associado
            }
        });
        if (!patientCreated) {
            patient.ficha = ficha;
            patient.nome = nome
            patient.data_nasc = data.format("YYYY-MM-DD")
            patient.email = email
            patient.sexo = sexo
            patient.imagem = imagem
            patient.n_associado = n_associado
            patient.save();

        }
        for (ind in addresses) {
            let { logradouro, bairro, cidade, uf, cep, numero, complemento } = addresses[ind];
            let endereco = { logradouro, bairro, cidade, uf, cep, numero, complemento }
            let [createdAddresses] = await Addresses.findOrCreate({
                where: endereco,
                defaults: endereco
            }
            );
            createdAddresses.push(createdAddresses)
        }
        for (ind in phones) {
            let [createdPhones] = await Phone.findOrCreate({
                where: { telefone: phones[ind].telefone },
            });
            createdPhones.push(createdPhones)
        }
        try{

            console.log("Set associations")
            console.log(Object.keys(Patient))
            await Patient.setProfessionals([dentista])
            await Patient.setAgreements([convenio])
            await Patient.setAddresses(createdAddresses);
            await Patient.setPhones(createdPhones)
        } catch (e){
            console.log(e)
        }


        return res.json(patient);

    },

    async import(req, res) {
        // todo
    }

};
