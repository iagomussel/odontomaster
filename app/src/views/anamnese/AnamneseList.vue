<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h4 class="panel-title">
        Anamneses
        <router-link
          :to="'/paciente/' + patientId + '/anamnese/nova'"
          class="btn btn-small right"
        >
          Nova Anamnese
        </router-link>
      </h4>
    </div>
    <div class="panel-body">
      <table class="striped" v-if="anamneses.length > 0">
        <thead>
          <tr>
            <th>Data</th>
            <th>Alergias</th>
            <th>Medicamentos</th>
            <th>Tratamento Medico</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="anamnese in anamneses" :key="anamnese.id">
            <td>{{ anamnese.data_preenchimento }}</td>
            <td>{{ anamnese.possui_alergia ? anamnese.alergia_descricao || 'Sim' : 'Nao' }}</td>
            <td>{{ anamnese.esta_tomando_medicamento ? anamnese.medicamento_descricao || 'Sim' : 'Nao' }}</td>
            <td>{{ anamnese.esta_em_tratamento_medico ? 'Sim' : 'Nao' }}</td>
            <td>
              <router-link
                :to="'/paciente/' + patientId + '/anamnese/' + anamnese.id"
                class="btn btn-small"
              >
                Ver/Editar
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Nenhuma anamnese cadastrada para este paciente.</p>
    </div>
  </div>
</template>

<script>
import webClient from "@/client_axios";

export default {
  name: "AnamneseList",
  props: {
    patientId: { type: [String, Number], required: true },
  },
  data() {
    return {
      anamneses: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      webClient.get("/anamneses/" + this.patientId).then((res) => {
        this.anamneses = res.data;
      });
    },
  },
};
</script>
