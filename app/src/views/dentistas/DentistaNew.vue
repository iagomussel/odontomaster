<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div class="row">
      <div class="input-field col s9">
        <label for="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          v-model="formulario.nome"
          placeholder="Nome"
          type="text"
          required="required"
        />
      </div>
      <div class="col s3">
        <hi-image-picker v-model="formulario.imagem" />
      </div>
    </div>

    <div class="form-group">
      <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
    </div>
  </form>
</template>
<script>
import webClient from "../../client_axios.js";

import HiImagePicker from "../../components/ImagePicker.vue";

export default {
  data() {
    return {
      dataImages: [],
      formulario: {
        nome: "",
        imagem: "",
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
  components: { "hi-image-picker": HiImagePicker },
};
</script>
