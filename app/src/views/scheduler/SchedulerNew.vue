<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div>
      <div class="input-field">
        <hi-select-ajax v-model="formulario.paciente" url="pacientes" TextField="nome" />
      </div>
      <div class="input-field">
        <hi-select-ajax v-model="formulario.dentista" url="dentistas" TextField="nome" />
      </div>
      <div class="input-field">
        <hi-select-ajax
          v-model="formulario.procedimento"
          url="procedimentos"
          TextField="nome"
        />
      </div>
      <div class="input-field">
        <label for="data">Data</label>
        <input
          v-mask="'##/##/####'"
          id="data"
          name="data"
          v-model="formulario.data"
          placeholder="Data"
          type="text"
          required="required"
        />
      </div>
      <div class="input-field">
        <label for="hora">Hora</label>
        <input
          v-mask="'##:##'"
          id="hora"
          name="hora"
          v-model="formulario.hora"
          placeholder="hora"
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
    return {
      dataImages: [],
      formulario: {
        dentista: null,
        procedimento: null,
        paciente: null,
        data: "",
        hora: "",
      },
    };
  },
  methods: {
    onSubmit() {
      webClient.post("/dentistas", this.formulario).then((res) => {
        console.log(res.data);
        if (res.data.id) {
          this.formulario.nome = "";
          this.$router.push("/dentistas");
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
