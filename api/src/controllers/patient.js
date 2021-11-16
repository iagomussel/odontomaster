// require models
const {
    Patient,
    Professional,
    User,
    Addresses,
    Phones,
    Agreement,
    Plan,
    Obs
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
            include: ['addresses', 'phones', "professionals", 'agreements', 'obs', 'plans']

        });
        return res.json(patients);
    },


    async find(req, res) {
        let patient = await Patient.findByPk(req.params.id, {
            include: { all: true, nested: true }
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
            professionals,
            addresses,
            phones,
            obs,
            plans
        } = req.body;
        if (imagem == "" || imagem == null) imagem = Constants.IMAGE_DEFAULT


        const createdPhones = []
        const createdAddresses = [];
        const createdPlans = [];
        const createdAgreements = [];
        const forCreatePlans = [];
        const createdObses = [];
        const createdProfessionals = [];

        let data = moment(data_nasc, "DD/MM/YYYY");
        if (!data.isValid()) {
            data = moment();
        }

        if (ficha == "") {
            ficha = await Patient.max("ficha");
            ficha += 1;
        }
        console.log(professionals)
        if (professionals.length > 0) {
            for (let p of professionals) {
                if (Number.isInteger(p.professional.id)) {
                    const professional = await Professional.findByPk(p.professional.id);
                    if (professional) {
                        createdProfessionals.push(professional);
                    } else {
                        return res.status(400).json({ error: "Professional not found" });
                    }
                } else {
                    let name = p.professional
                    console.log(Constants.PASSWORD_DEFAULT)
                    let [user] = await User.findOrCreate({
                        where: { username: name },
                        defaults: {

                            username: nome,
                            password: passwordHash.generate(process.env.DEFAULT_PASSWORD),
                        }
                    });

                    const professional = await Professional.create({
                        nome: name,
                        image: Constants.IMAGE_DEFAULT,

                    });
                    professional.setUser(user);
                    createdProfessionals.push(professional);
                }

            }
        }

        /*convenio create on register patient */
        if (plans.lenght == 0) {
            let convenio = await Agreement.findOne({
                where: {
                    default: true
                }
            })
            createsAgreements.push({ convenio, numero: '', ativo: "Sim" })
        }
        for (let u_plan of plans) {
            let CreatedConvenio = null;
            if (u_plan.agreement.id == undefined) {
                let _nome = u_plan.agreement;
                CreatedConvenio = await Agreement.create({ nome: _nome });
            } else {
                CreatedConvenio = await Agreement.findOne({
                    where: Number.isInteger(u_plan.agreement.id) ? { id: u_plan.agreement.id } : { nome: u_plan.agreement.id }
                })
            }

            

            createdAgreements.push(CreatedConvenio)
            forCreatePlans.push({
                agreement: CreatedConvenio,
                numero: (u_plan.numero == undefined ? "" : u_plan.numero),
                ativo: u_plan.ativo == undefined ? "Sim" : u_plan.ativo
            })
        }
        //create plans
        for (ind in forCreatePlans) {
            let [plan, created] = await Plan.findOrCreate({
                where: {
                    agreement_id: forCreatePlans[ind].agreement.id,
                    numero: (forCreatePlans[ind].numero == undefined ? "" : forCreatePlans[ind].numero)
                },
                defaults: {
                    numero: (forCreatePlans[ind].numero == undefined ? "" : forCreatePlans[ind].numero),
                    ativo: forCreatePlans[ind].ativo
                }
            })
            plan.setAgreement(forCreatePlans[ind].agreement)
            createdPlans.push(plan)
        }

        const [patient, patientCreated] = await Patient.findOrCreate({
            where: { id },
            defaults: {
                ficha,
                nome,
                data_nasc: data.format("YYYY-MM-DD"),
                email,
                sexo,
                imagem
            }
        });
        if (!patientCreated) {
            patient.ficha = ficha;
            patient.nome = nome
            patient.data_nasc = data.format("YYYY-MM-DD")
            patient.email = email
            patient.sexo = sexo
            patient.imagem = imagem
            patient.save();

        }


        //create obs
        for (ind in obs) {
            if (obs[ind].obs == undefined || obs[ind].obs == "" || obs[ind].obs == null) continue;
            let [observation, created] = await Obs.findOrCreate({
                where: {
                    obs: obs[ind].obs,
                },
            })
            createdObses.push(observation)
        }
        //create addresses
        for (ind in addresses) {
            let { logradouro, bairro, cidade, uf, cep, numero, complemento } = addresses[ind];
            let endereco = { logradouro, bairro, cidade, uf, cep, numero, complemento }
            let [createdAddress] = await Addresses.findOrCreate({
                where: endereco,
                defaults: endereco
            }
            );
            createdAddresses.push(createdAddress)
        }

        //create phones
        for (ind in phones) {
            let [createdPhone] = await Phones.findOrCreate({
                where: {
                    telefone: phones[ind].telefone == undefined ? "" : phones[ind].telefone,
                    tipo: phones[ind].tipo == undefined ? "" : phones[ind].tipo,
                    contato: phones[ind].contato == undefined ? "" : phones[ind].contato
                },

                defaults: {
                    telefone: phones[ind].telefone == undefined ? "" : phones[ind].telefone,
                    tipo: phones[ind].tipo == undefined ? "" : phones[ind].tipo,
                    contato: phones[ind].contato == undefined ? "" : phones[ind].contato
                }
            });
            console.log(createdPhone)
            createdPhones.push(createdPhone)
        }


        Promise.all([

            patient.setProfessionals(createdProfessionals),
            patient.setAgreements(createdAgreements),
            patient.setAddresses(createdAddresses),
            patient.setPlans(createdPlans),
            patient.setPhones(createdPhones),
            patient.setObs(createdObses)
        ])
            .then(() => {
                return res.json(patient);
            }).catch(err => {
                return res.status(400).json(err);
            })
    },

    async import(req, res) {
        // todo
    }

};
