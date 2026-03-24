<template>
  <div>
    <h4 v-if="patientName">Odontograma - {{ patientName }}</h4>
    <odontograma-chart :patientId="patientId" />
    <div style="margin-top: 16px;">
      <router-link :to="'/paciente/' + patientId" class="btn">
        Voltar ao Paciente
      </router-link>
    </div>
  </div>
</template>

<script>
import webClient from "@/client_axios";
import OdontogramaChart from "./OdontogramaChart.vue";

export default {
  name: "OdontogramaPage",
  components: {
    "odontograma-chart": OdontogramaChart,
  },
  data() {
    return {
      patientName: "",
    };
  },
  computed: {
    patientId() {
      return this.$route.params.patient_id;
    },
  },
  mounted() {
    webClient.get("/paciente/" + this.patientId).then((res) => {
      this.patientName = res.data.nome;
    });
  },
};
</script>
