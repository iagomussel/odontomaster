const Paciente = require("../models/Paciente");
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const moment = require("moment");
const whereLike = require("../utils/whereLike");

module.exports = {
    async index(req, res) {
        const { page, search } = req.params
        let pacientes = await Paciente.paginate({
            page: page || 1,
            paginate: 10,
            where: whereLike(Paciente, search),
        });
        return res.json(pacientes);
    },


    async find(req, res) {
        let paciente = await Paciente.findByPk(req.params.id, {
            include: ['enderecos', 'telefones']
        });
        res.json(paciente);
    },
    async ficha(req, res) {
        let ficha = await Paciente.max("ficha");
        res.json(ficha || 1);
    },
    async store(req, res) {
        let {
            ficha,
            nome,
            data_nasc,
            sexo,
            email,
            imagem,
            convenio_id,
            dentista_id,
            enderecos,
            telefones,
        } = req.body;
        let data = moment(data_nasc, "DD/MM/YYYY");
        if (!data.isValid()) {
            data = moment();
        }

        if (ficha == "") {
            ficha = await Paciente.max("ficha");
            ficha += 1;
        }
        try {
            const paciente = await Paciente.create({
                ficha,
                nome,
                data_nasc: data.format("YYYY-MM-DD"),
                email,
                sexo,
                imagem,
                dentista_id,
                convenio_id,
            });
            for (endereco in enderecos) {
                let created_endereco = await Endereco.create(endereco);
                await paciente.addEndereco(created_endereco);
            }
            for (telefone in telefones) {
                let [created_telefone] = await Telefone.findOrCreate({
                    where: { telefone: telefones[telefone] },
                });
                console.log(created_telefone);
                paciente.addTelefone(created_telefone);
            }
            return res.json(paciente);
        } catch {
            return res.status(401).json({ erro: "Cadastro não realizado" });
        }
    },
};
