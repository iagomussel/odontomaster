<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h5>Relatórios</h5>
      </div>
    </div>

    <!-- Date Filter -->
    <div class="row">
      <div class="col s3">
        <label>Data Início</label>
        <input type="date" v-model="inicio" />
      </div>
      <div class="col s3">
        <label>Data Fim</label>
        <input type="date" v-model="fim" />
      </div>
      <div class="col s3">
        <label>Tipo de Relatório</label>
        <select v-model="tipoRelatorio" class="browser-default">
          <option value="resumo">Resumo Geral</option>
          <option value="pacientes">Pacientes</option>
          <option value="consultas">Consultas</option>
          <option value="financeiro">Financeiro</option>
          <option value="procedimentos">Procedimentos</option>
        </select>
      </div>
      <div class="col s3" style="padding-top: 25px">
        <a class="waves-effect waves-light btn" @click="loadReport">
          Gerar Relatório
        </a>
        <a class="waves-effect waves-light btn grey" @click="printReport" v-if="reportData">
          Imprimir
        </a>
      </div>
    </div>

    <!-- Overview Report -->
    <div v-if="tipoRelatorio === 'resumo' && reportData" id="report-content">
      <div class="row">
        <div class="col s4" v-for="(card, idx) in overviewCards" :key="idx">
          <div class="card-panel center-align">
            <h6>{{ card.title }}</h6>
            <h4 :class="card.color">{{ card.value }}</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Patients Report -->
    <div v-if="tipoRelatorio === 'pacientes' && reportData" id="report-content">
      <div class="row">
        <div class="col s4">
          <div class="card-panel center-align">
            <h6>Total de Pacientes</h6>
            <h4>{{ reportData.total }}</h4>
          </div>
        </div>
        <div class="col s4">
          <div class="card-panel center-align">
            <h6>Masculino</h6>
            <h4 class="blue-text">{{ reportData.byGender.masculino }}</h4>
          </div>
        </div>
        <div class="col s4">
          <div class="card-panel center-align">
            <h6>Feminino</h6>
            <h4 class="pink-text">{{ reportData.byGender.feminino }}</h4>
          </div>
        </div>
      </div>
      <table class="highlight responsive-table">
        <thead>
          <tr>
            <th>Ficha</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data Nasc.</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in reportData.patients" :key="p.id">
            <td>{{ p.ficha }}</td>
            <td>{{ p.nome }}</td>
            <td>{{ p.sexo === "M" ? "Masculino" : "Feminino" }}</td>
            <td>{{ p.data_nasc }}</td>
            <td>{{ p.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Consultations Report -->
    <div v-if="tipoRelatorio === 'consultas' && reportData" id="report-content">
      <div class="row">
        <div class="col s3">
          <div class="card-panel center-align">
            <h6>Total</h6>
            <h4>{{ reportData.total }}</h4>
          </div>
        </div>
        <div class="col s3" v-for="(count, status) in reportData.byStatus" :key="status">
          <div class="card-panel center-align">
            <h6>{{ formatStatus(status) }}</h6>
            <h4>{{ count }}</h4>
          </div>
        </div>
      </div>
      <h6>Por Profissional</h6>
      <table class="highlight">
        <thead>
          <tr>
            <th>Profissional</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, name) in reportData.byProfessional" :key="name">
            <td>{{ name }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
      <h6 style="margin-top: 20px">Detalhamento</h6>
      <table class="highlight responsive-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Paciente</th>
            <th>Profissional</th>
            <th>Procedimento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in reportData.consultations" :key="c.id">
            <td>{{ c.day }}</td>
            <td>{{ c.horario }}</td>
            <td>{{ c.patient ? c.patient.nome : c.paciente_nome }}</td>
            <td>{{ c.professional ? c.professional.nome : "-" }}</td>
            <td>{{ c.procedure ? c.procedure.nome : "-" }}</td>
            <td>{{ formatStatus(c.status) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Financial Report -->
    <div v-if="tipoRelatorio === 'financeiro' && reportData" id="report-content">
      <div class="row">
        <div class="col s4 center-align">
          <div class="card-panel">
            <h6>Receitas</h6>
            <h4 class="green-text">R$ {{ reportData.totalReceitas }}</h4>
          </div>
        </div>
        <div class="col s4 center-align">
          <div class="card-panel">
            <h6>Despesas</h6>
            <h4 class="red-text">R$ {{ reportData.totalDespesas }}</h4>
          </div>
        </div>
        <div class="col s4 center-align">
          <div class="card-panel">
            <h6>Saldo</h6>
            <h4 :class="reportData.saldo >= 0 ? 'green-text' : 'red-text'">
              R$ {{ reportData.saldo }}
            </h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <h6>Por Forma de Pagamento</h6>
          <table class="highlight">
            <thead>
              <tr>
                <th>Forma</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val, method) in reportData.byPaymentMethod" :key="method">
                <td>{{ method }}</td>
                <td>R$ {{ parseFloat(val).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col s6">
          <h6>Por Status</h6>
          <table class="highlight">
            <thead>
              <tr>
                <th>Status</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val, status) in reportData.byStatus" :key="status">
                <td>{{ formatFinancialStatus(status) }}</td>
                <td>R$ {{ parseFloat(val).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h6 style="margin-top: 20px">Detalhamento</h6>
      <table class="highlight responsive-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Forma Pgto</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reportData.records" :key="r.id">
            <td>{{ r.data }}</td>
            <td :class="r.tipo === 'receita' ? 'green-text' : 'red-text'">
              {{ r.tipo === "receita" ? "Receita" : "Despesa" }}
            </td>
            <td>{{ r.descricao }}</td>
            <td>R$ {{ parseFloat(r.valor).toFixed(2) }}</td>
            <td>{{ r.forma_pagamento || "-" }}</td>
            <td>{{ formatFinancialStatus(r.status) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Procedures Report -->
    <div v-if="tipoRelatorio === 'procedimentos' && reportData" id="report-content">
      <div class="row">
        <div class="col s12">
          <div class="card-panel center-align">
            <h6>Total de Consultas com Procedimentos</h6>
            <h4>{{ reportData.total }}</h4>
          </div>
        </div>
      </div>
      <h6>Ranking de Procedimentos</h6>
      <table class="highlight responsive-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Procedimento</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proc, idx) in reportData.ranking" :key="proc.nome">
            <td>{{ idx + 1 }}</td>
            <td>{{ proc.nome }}</td>
            <td>{{ proc.count }}</td>
            <td>R$ {{ proc.valor.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="center-align" style="padding: 40px">
      <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left"><div class="circle"></div></div>
          <div class="gap-patch"><div class="circle"></div></div>
          <div class="circle-clipper right"><div class="circle"></div></div>
        </div>
      </div>
    </div>

    <!-- No data -->
    <div
      v-if="!loading && !reportData"
      class="center-align grey-text"
      style="padding: 40px"
    >
      <i class="material-icons" style="font-size: 48px">assessment</i>
      <p>Selecione os filtros e clique em "Gerar Relatório"</p>
    </div>
  </div>
</template>

<script>
import webClient from "@/client_axios";
import moment from "moment";

export default {
  name: "RelatoriosPage",
  data() {
    return {
      tipoRelatorio: "resumo",
      inicio: moment().startOf("month").format("YYYY-MM-DD"),
      fim: moment().endOf("month").format("YYYY-MM-DD"),
      reportData: null,
      loading: false,
    };
  },
  computed: {
    overviewCards() {
      if (!this.reportData) return [];
      const d = this.reportData;
      return [
        { title: "Pacientes Cadastrados", value: String(d.patientCount), color: "blue-text" },
        { title: "Consultas no Período", value: String(d.consultationCount), color: "green-text" },
        { title: "Consultas Canceladas", value: String(d.canceledCount), color: "red-text" },
        { title: "Receitas", value: "R$ " + d.totalReceitas, color: "green-text" },
        { title: "Despesas", value: "R$ " + d.totalDespesas, color: "red-text" },
        { title: "Saldo", value: "R$ " + d.saldo, color: parseFloat(d.saldo) >= 0 ? "green-text" : "red-text" },
      ];
    },
  },
  methods: {
    loadReport() {
      this.loading = true;
      this.reportData = null;

      const inicioFormatted = moment(this.inicio).format("DD-MM-YYYY");
      const fimFormatted = moment(this.fim).format("DD-MM-YYYY");
      const params = `?inicio=${inicioFormatted}&fim=${fimFormatted}`;

      webClient
        .get(`/relatorios/${this.tipoRelatorio}${params}`)
        .then((res) => {
          this.reportData = res.data;
        })
        .catch(() => {
          alert("Erro ao gerar relatório");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    printReport() {
      window.print();
    },
    formatStatus(status) {
      const map = {
        active: "Ativa",
        canceled: "Cancelada",
        completed: "Concluída",
      };
      return map[status] || status;
    },
    formatFinancialStatus(status) {
      const map = {
        pago: "Pago",
        pendente: "Pendente",
        cancelado: "Cancelado",
      };
      return map[status] || status;
    },
  },
};
</script>

<style scoped>
@media print {
  .btn {
    display: none !important;
  }
}
</style>
