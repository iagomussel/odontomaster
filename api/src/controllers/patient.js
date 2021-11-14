// require models
const {
    Patient,
    Professional,
    User,
    Addresses,
    Phones,
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
        let patients = await patient.paginate({
            page: realpage,
            paginate: 10,
            where: whereLike(patient, search),
            include: ['addresses', 'phones', "professional", 'convenio']

        });
        return res.json(patients);
    },


    async find(req, res) {
        let patient = await patient.findByPk(req.params.id, {
            include: ['addresses', 'phones', "dentista", 'convenio']
        });
        res.json(patient);
    },
    async ficha(req, res) {
        let ficha = await patient.max("ficha");
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
            ficha = await patient.max("ficha");
            ficha += 1;
        }
        /* dentista create on register patient */
        let dentista = await Dentista.findOne({
            where: Number.isInteger(dentistaId) ? { id: dentistaId } : { nome: dentistaId }
        })
        if (!dentista) {
            let _nome = dentistaId;
            let imagem = Constants.IMAGE_DEFAULT;
            let user = await User.create({
                username: nome,
                password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
            });

            dentista = await Dentista.create({ nome: _nome, imagem, user_id: user.id });
        }


        /*convenio create on register patient */
        let convenio;
        if (convenioId == null || convenioId == "") {
            convenio = await Convenio.findOne({
                where: {
                    default: true
                }
            })
        } else {
            convenio = await Convenio.findOne({
                where: Number.isInteger(convenioId) ? { id: convenioId } : { nome: convenioId }
            })
        }

        if (!convenio) {

            let _nome = convenioId;
            convenio = await Convenio.create({ nome: _nome });
        }

        const [patient, patientCreated] = await patient.findOrCreate({
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
            let [createdEndereco] = await Endereco.findOrCreate({
                where: endereco,
                defaults: endereco
            }
            );
            createdAddresses.push(createdEndereco)
        }
        for (ind in phones) {
            let [createdTelefone] = await Telefone.findOrCreate({
                where: { telefone: phones[ind].telefone },
            });
            createdPhones.push(createdTelefone)
        }

        await patient.setProfessional(dentista)
        await patient.setConvenio(convenio)
        await patient.setAddresses(createdAddresses);
        await patient.setPhones(createdPhones)
        return res.json(patient);

    },

    async import(req, res) {
        /*
        this function import a list of patients from a csv file
        created by: @iagomussel
        params: csv file

        */
        let { file } = req.files
        let patients = await csv().fromFile(file.path);
        for (ind in patients) {
            let patient = patients[ind]
            let {
                ficha,
                nome,
                data_nasc,
                sexo,
                email,
                imagem,
                convenioId,
                dentistaId,
                n_associado,
            } = patient;
            if (imagem == "" || imagem == null) imagem = Constants.IMAGE_DEFAULT
            const createdPhones = []
            const createdAddresses = [];

            let data = moment(data_nasc, "DD/MM/YYYY");
            if (!data.isValid()) {
                data = moment();
            }

            if (ficha == "") {
                ficha = await patient.max("ficha");
                ficha += 1;
            }
            /* dentista create on register patient */
            let dentista = await Dentista.findOne({
                where: Number.isInteger(dentistaId) ? { id: dentistaId } : { nome: dentistaId }
            })
            if (!dentista) {
                let _nome = dentistaId;
                let imagem = Constants.IMAGE_DEFAULT;
                let user = await User.create({
                    username: nome,
                    password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
                });

                dentista = await Dentista.create({ nome: _nome, imagem, user_id: user.id });
            }
            /*convenio create on register patient */
            let convenio;
            if (convenioId == null || convenioId == "") {
                convenio = await Convenio.findOne({
                    where: {
                        default: true
                    }
                })
            } else {
                convenio = await Convenio.findOne({
                    where: Number.isInteger(convenioId) ? { id: convenioId } : { nome: convenioId }
                })
            }

            if (!convenio) {

                let _nome = convenioId;
                convenio = await Convenio.create({ nome: _nome });
            }

            const [patient, patientCreated] = await patient.findOrCreate({
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
                let [createdEndereco] = await Endereco.findOrCreate({
                    where: endereco,
                    defaults: endereco
                }
                );
                createdAddresses.push(createdEndereco)
            }
            for (ind in phones) {
                let [createdTelefone] = await Telefone.findOrCreate({
                    where: { telefone: phones[ind].telefone },
                });
                createdPhones.push(createdTelefone)
            }

            await patient.setDentista(dentista)
            await patient.setConvenio(convenio)
            console.log(res.json(patient));

        }
    }

};
