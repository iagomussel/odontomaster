const { Patient, Consultation, Financial } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

function parseDateRange(query) {
    const where = {};
    if (query.inicio && query.fim) {
        const inicio = moment(query.inicio, "DD-MM-YYYY").startOf("day");
        const fim = moment(query.fim, "DD-MM-YYYY").endOf("day");
        if (inicio.isValid() && fim.isValid()) {
            where[Op.between] = [inicio.format(), fim.format()];
        }
    } else {
        const inicio = moment().startOf("month");
        const fim = moment().endOf("month");
        where[Op.between] = [inicio.format(), fim.format()];
    }
    return where;
}

module.exports = {
    async patients(req, res) {
        try {
            const where = {};

            if (req.query.sexo) {
                where.sexo = req.query.sexo;
            }

            const patients = await Patient.findAll({
                where,
                include: [
                    { association: "phones" },
                    { association: "agreements" },
                ],
                order: [["nome", "ASC"]],
            });

            const total = patients.length;

            const byGender = {
                masculino: patients.filter((p) => p.sexo === "M").length,
                feminino: patients.filter((p) => p.sexo === "F").length,
            };

            return res.json({ total, byGender, patients });
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar relatório de pacientes" });
        }
    },

    async consultations(req, res) {
        try {
            const dateRange = parseDateRange(req.query);
            const where = { horario: dateRange };

            if (req.query.status) {
                where.status = req.query.status;
            }

            if (req.query.professional_id) {
                where.professional_id = req.query.professional_id;
            }

            const consultations = await Consultation.findAll({
                where,
                include: ["patient", "professional", "procedure"],
                order: [["horario", "DESC"]],
            });

            const total = consultations.length;
            const byStatus = {};
            const byProfessional = {};

            consultations.forEach((c) => {
                const status = c.status || "active";
                byStatus[status] = (byStatus[status] || 0) + 1;

                const profName = c.professional ? c.professional.nome : "Sem profissional";
                byProfessional[profName] = (byProfessional[profName] || 0) + 1;
            });

            return res.json({ total, byStatus, byProfessional, consultations });
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar relatório de consultas" });
        }
    },

    async financial(req, res) {
        try {
            const dateRange = parseDateRange(req.query);
            const where = { data: dateRange };

            if (req.query.tipo) {
                where.tipo = req.query.tipo;
            }

            const records = await Financial.findAll({
                where,
                include: ["patient", "professional", "procedure"],
                order: [["data", "DESC"]],
            });

            let totalReceitas = 0;
            let totalDespesas = 0;
            const byPaymentMethod = {};
            const byStatus = {};

            records.forEach((r) => {
                const valor = parseFloat(r.valor) || 0;
                if (r.tipo === "receita") {
                    totalReceitas += valor;
                } else {
                    totalDespesas += valor;
                }

                const method = r.forma_pagamento || "Não informado";
                byPaymentMethod[method] = (byPaymentMethod[method] || 0) + valor;

                const status = r.status || "pendente";
                byStatus[status] = (byStatus[status] || 0) + valor;
            });

            return res.json({
                totalReceitas: totalReceitas.toFixed(2),
                totalDespesas: totalDespesas.toFixed(2),
                saldo: (totalReceitas - totalDespesas).toFixed(2),
                byPaymentMethod,
                byStatus,
                records,
            });
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar relatório financeiro" });
        }
    },

    async procedures(req, res) {
        try {
            const dateRange = parseDateRange(req.query);

            const consultations = await Consultation.findAll({
                where: { horario: dateRange },
                include: ["procedure", "professional"],
            });

            const procedureStats = {};

            consultations.forEach((c) => {
                if (!c.procedure) return;
                const name = c.procedure.nome;
                if (!procedureStats[name]) {
                    procedureStats[name] = { count: 0, valor: 0 };
                }
                procedureStats[name].count++;
                procedureStats[name].valor += parseFloat(c.procedure.valor) || 0;
            });

            const ranking = Object.entries(procedureStats)
                .map(([nome, stats]) => ({ nome, ...stats }))
                .sort((a, b) => b.count - a.count);

            return res.json({ total: consultations.length, ranking });
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar relatório de procedimentos" });
        }
    },

    async overview(req, res) {
        try {
            const dateRange = parseDateRange(req.query);

            const [
                patientCount,
                consultationCount,
                canceledCount,
                receitas,
                despesas,
            ] = await Promise.all([
                Patient.count(),
                Consultation.count({ where: { horario: dateRange } }),
                Consultation.count({ where: { horario: dateRange, status: "canceled" } }),
                Financial.sum("valor", { where: { data: dateRange, tipo: "receita" } }),
                Financial.sum("valor", { where: { data: dateRange, tipo: "despesa" } }),
            ]);

            const totalReceitas = receitas || 0;
            const totalDespesas = despesas || 0;

            return res.json({
                patientCount,
                consultationCount,
                canceledCount,
                totalReceitas: totalReceitas.toFixed(2),
                totalDespesas: totalDespesas.toFixed(2),
                saldo: (totalReceitas - totalDespesas).toFixed(2),
            });
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar relatório geral" });
        }
    },
};
