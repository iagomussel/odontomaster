<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h4 class="panel-title">
        Historico de Consultas
      </h4>
    </div>
    <div class="panel-body">
      <table class="striped" v-if="consultations.length > 0">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horario</th>
            <th>Dentista</th>
            <th>Procedimento</th>
            <th>Status</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="consultation in consultations" :key="consultation.id">
            <td>{{ consultation.day }}</td>
            <td>{{ consultation.horario }} - {{ consultation.horario_termino }}</td>
            <td>{{ consultation.professional ? consultation.professional.nome : '-' }}</td>
            <td>{{ consultation.procedure ? consultation.procedure.nome : '-' }}</td>
            <td>
              <span
                class="badge"
                :class="consultation.status === 'active' ? 'green' : 'red'"
                style="padding: 4px 8px; border-radius: 4px; color: white;"
              >
                {{ consultation.status === 'active' ? 'Realizada' : 'Cancelada' }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-small"
                @click="toggleEvolutions(consultation.id)"
              >
                {{ expandedId === consultation.id ? 'Fechar' : 'Evolucoes' }}
                ({{ (consultation.evolutions || []).length }})
              </button>
            </td>
          </tr>
          <template v-if="expandedId">
          <tr v-for="consultation in consultations.filter(c => c.id === expandedId)" :key="'evo-' + consultation.id">
            <td colspan="6" style="padding: 16px; background: #f5f5f5;">
              <div class="evolution-section">
                <h6><b>Evolucoes Clinicas</b></h6>

                <div
                  v-for="evo in consultation.evolutions"
                  :key="evo.id"
                  class="card-panel"
                  style="margin: 8px 0; padding: 12px;"
                >
                  <div class="row" style="margin-bottom: 0;">
                    <div class="col s10">
                      <small class="grey-text">
                        {{ evo.data_registro }}
                        <span v-if="evo.professional"> - Dr(a). {{ evo.professional.nome }}</span>
                      </small>
                      <p style="margin: 4px 0 0 0; white-space: pre-wrap;">{{ evo.descricao }}</p>
                    </div>
                    <div class="col s2 right-align">
                      <button
                        class="btn-small red"
                        @click="deleteEvolution(evo.id)"
                      >
                        <i class="material-icons" style="font-size: 18px;">delete</i>
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="(consultation.evolutions || []).length === 0" class="grey-text">
                  Nenhuma evolucao registrada.
                </div>

                <div class="row" style="margin-top: 16px;">
                  <div class="col s12">
                    <label class="active">Nova Evolucao</label>
                    <textarea
                      v-model="newEvolution.descricao"
                      class="materialize-textarea"
                      placeholder="Descreva a evolucao clinica..."
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="col s12">
                    <button
                      class="btn"
                      :disabled="!newEvolution.descricao"
                      @click="saveEvolution(consultation.id)"
                    >
                      Salvar Evolucao
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </template>
        </tbody>
      </table>
      <p v-else>Nenhuma consulta registrada para este paciente.</p>
    </div>
  </div>
</template>

<script>
import webClient from "@/client_axios";

export default {
  name: "ConsultationHistory",
  props: {
    patientId: { type: [String, Number], required: true },
  },
  data() {
    return {
      consultations: [],
      expandedId: null,
      newEvolution: {
        descricao: "",
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      webClient.get("/consultas/paciente/" + this.patientId).then((res) => {
        this.consultations = res.data;
      });
    },
    toggleEvolutions(id) {
      this.expandedId = this.expandedId === id ? null : id;
      this.newEvolution.descricao = "";
    },
    saveEvolution(consultationId) {
      webClient
        .post("/evolucao/" + consultationId, {
          descricao: this.newEvolution.descricao,
        })
        .then(() => {
          this.newEvolution.descricao = "";
          this.load();
        });
    },
    deleteEvolution(evoId) {
      if (!confirm("Deseja excluir esta evolucao?")) return;
      webClient.delete("/evolucao/" + evoId).then(() => {
        this.load();
      });
    },
  },
};
</script>
