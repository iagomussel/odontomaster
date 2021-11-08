const patient = require("../models/patient");
const Dentista = require("../models/Dentista");
const Convenio = require("../models/Convenio");
const User = require("../models/User");
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
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
            include: ['enderecos', 'telefones', "dentista", 'convenio']

        });
        return res.json(patients);
    },


    async find(req, res) {
        let patient = await patient.findByPk(req.params.id, {
            include: ['enderecos', 'telefones', "dentista", 'convenio']
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
            enderecos,
            telefones,
            n_associado,
        } = req.body;
        if (imagem == "" || imagem == null) imagem = Constants.IMAGE_DEFAULT


        const createdTelefones = []
        const createdEnderecos = [];

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
        for (ind in enderecos) {
            let { logradouro, bairro, cidade, uf, cep, numero, complemento } = enderecos[ind];
            let endereco = { logradouro, bairro, cidade, uf, cep, numero, complemento }
            let [createdEndereco] = await Endereco.findOrCreate({
                where: endereco,
                defaults: endereco
            }
            );
            createdEnderecos.push(createdEndereco)
        }
        for (ind in telefones) {
            let [createdTelefone] = await Telefone.findOrCreate({
                where: { telefone: telefones[ind].telefone },
            });
            createdTelefones.push(createdTelefone)
        }

        await patient.setDentista(dentista)
        await patient.setConvenio(convenio)
        await patient.setEnderecos(createdEnderecos);
        await patient.setTelefones(createdTelefones)
        return res.json(patient);

        // } catch {
        //     return res.status(401).json({ erro: "Cadastro não realizado" });
        // }
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
            const createdTelefones = []
            const createdEnderecos = [];

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
            for (ind in enderecos) {
                let { logradouro, bairro, cidade, uf, cep, numero, complemento } = enderecos[ind];
                let endereco = { logradouro, bairro, cidade, uf, cep, numero, complemento }
                let [createdEndereco] = await Endereco.findOrCreate({
                    where: endereco,
                    defaults: endereco
                }
                );
                createdEnderecos.push(createdEndereco)
            }
            for (ind in telefones) {
                let [createdTelefone] = await Telefone.findOrCreate({
                    where: { telefone: telefones[ind].telefone },
                });
                createdTelefones.push(createdTelefone)
            }

            await patient.setDentista(dentista)
            await patient.setConvenio(convenio)
            console.log(res.json(patient));

        }
    }

};
