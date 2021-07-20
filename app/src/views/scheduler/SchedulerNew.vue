<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div>
      <div class="input-field">
        <label class="active">Paciente</label>
        <hi-select-ajax v-model="formulario.paciente" url="pacientes" TextField="nome" />
      </div>
      <div class="input-field" v-if="!formulario.encaixe_id">
        <label class="active">Dentista</label>
        <hi-select-ajax v-model="formulario.dentista" url="dentistas" TextField="nome" />
      </div>
      <div class="input-field">
        <label class="active">Procedimento</label>
        <hi-select-ajax
          v-model="formulario.procedimento"
          url="procedimentos"
          TextField="nome"
        />
      </div>
      <div v-if="!formulario.encaixe_id" class="input-field">
        <label class="active">Data</label>
        <input
          v-mask="'##/##/####'"
          v-model="formulario.data"
          placeholder="Data"
          type="text"
          required="required"
        />
      </div>
      <div class="input-field" v-if="!formulario.encaixe_id">
        <label class="active">Horario</label>
        <input
          v-mask="'##:##'"
          v-model="formulario.horario"
          placeholder="horario"
          type="text"
          required="required"
        />
      </div>
    </div>

    <div class="form-group">
      <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
    </div>
  </form>
</template>
<script>
import webClient from "../../client_axios.js";

import HiSelectAjax from "../../components/SelectAjax.vue";
import { mask } from "vue-the-mask";

export default {
  data() {
    console.log(this.$route.query);
    return {
      dataImages: [],
      formulario: {
        id: null,
        encaixe_id: null,
        dentista: null,
        procedimento: null,
        paciente: null,
        data: "",
        horario: "",
        ...this.$route.query,
      },
    };
  },
  methods: {
    onSubmit() {
      webClient.post("/consulta", this.formulario).then((res) => {
        if (res.data) {
          this.$router.push({ path: "/agenda", query: { dia: res.data.Data } });
        }
      });
    },
  },
  components: {
    "hi-select-ajax": HiSelectAjax,
  },
  directives: { mask },
};
</script>
