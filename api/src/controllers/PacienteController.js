const Paciente = require("../models/Paciente");
const Dentista = require("../models/Dentista");
const User = require("../models/User");
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const moment = require("moment");
const whereLike = require("../utils/whereLike");
const passwordHash = require("password-hash");

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
        const {
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

        let dentista = await Dentista.findOne({
            where: Number.isInteger(dentistaId) ? { id: dentistaId } : { nome: dentistaId}
        })
        if(!dentista){
            let nome =  dentistaId;
            let imagem = null;
            let user = await User.create({
                username: nome,
                password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
            });

           dentista = await Dentista.create({ nome, imagem, user_id: user.id });
        }
        console.log(dentista)
        const [paciente, pacienteCreated] = await Paciente.findOrCreate({
            where: { id },
            defaults: {
                ficha,
                nome,
                data_nasc: data.format("YYYY-MM-DD"),
                email,
                sexo,
                imagem,
                dentistaId:dentista.id,
                convenioId,
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
