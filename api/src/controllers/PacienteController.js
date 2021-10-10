const Paciente = require("../models/Paciente");
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
        let pacientes = await Paciente.paginate({
            page: realpage,
            paginate: 10,
            where: whereLike(Paciente, search),
            include: ['enderecos', 'telefones', "dentista", 'convenio']

        });
        return res.json(pacientes);
    },


    async find(req, res) {
        let paciente = await Paciente.findByPk(req.params.id, {
            include: ['enderecos', 'telefones', "dentista", 'convenio']
        });
        res.json(paciente);
    },
    async ficha(req, res) {
        let ficha = await Paciente.max("ficha");
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
        } = req.body;
        if (imagem == "" || imagem ==  null) imagem = Constants.IMAGE_DEFAULT
        console.log(imagem)


        const createdTelefones = []
        const createdEnderecos = [];

        let data = moment(data_nasc, "DD/MM/YYYY");
        if (!data.isValid()) {
            data = moment();
        }

        if (ficha == "") {
            ficha = await Paciente.max("ficha");
            ficha += 1;
        }
        /* dentista create on register paciente */
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


        /*convenio create on register paciente */
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

        const [paciente, pacienteCreated] = await Paciente.findOrCreate({
            where: { id },
            defaults: {
                ficha,
                nome,
                data_nasc: data.format("YYYY-MM-DD"),
                email,
                sexo,
                imagem,
                dentistaId: dentista.id,
                convenioId: convenio.id,
            }
        });
        if (!pacienteCreated) {
            paciente.ficha = ficha;
            paciente.nome = nome
            paciente.data_nasc = data.format("YYYY-MM-DD")
            paciente.email = email
            paciente.sexo = sexo
            paciente.imagem = imagem
            paciente.save();

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
        await paciente.setEnderecos(createdEnderecos);
        await paciente.setTelefones(createdTelefones)
        return res.json(paciente);

        // } catch {
        //     return res.status(401).json({ erro: "Cadastro não realizado" });
        // }
    },
};
