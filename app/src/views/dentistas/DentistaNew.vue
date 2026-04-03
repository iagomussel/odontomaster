<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div class="row">Cadastro de Dentistas</div>
    <div class="row">
      <div class=" col s9">
      <div class="row"><div class="col s4">
        <div class="input-field">
        <label  class="active" for="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          v-model="formulario.nome"
          placeholder="Nome"
          type="text"
          required="required"
        />
        </div>
        </div>
        <div class="col s4">
        <div class="input-field">
        <label  class="active" for="CRM">CRM</label>
        <input
          id="CRM"
          name="CRM"
          v-model="formulario.CRM"
          placeholder="CRM"
          type="text"
          required="required"
        />
        </div>
        </div>
                <div class="col s4">
        <div class="input-field">
        <label  class="active" for="contato">contato</label>
        <input
          id="contato"
          name="contato"
          v-model="formulario.contato"
          placeholder="contato"
          type="text"
          required="required"
        />
        </div>
        </div>
        </div>
        <div class="flex-box" >

        <div v-for="(header, col, key) in formulario.availableDays" v-bind:key="key">
          <hi-check-open-close-time
           v-model="formulario.availableDays[key]"
          />
        </div>

    </div>
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
import webClient from "@/client_axios";

import HiImagePicker from "../../components/ImagePicker.vue";
import checkOpenCloseTime from "../../components/utils/checkOpenCloseTime.vue";
export default {
  mounted() {
    let id = this.$route.params.id;
    console.log(id);
    if (id) {
      webClient
        .get("/dentista/" + id)
        .then((res) => {
          this.formulario = { ...this.formulario, ...res.data };
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  data() {
    return {
      dataImages: [],
      formulario: {
        nome: "",
        imagem: "",
        availableDays:[{enabled: true, open:"08:00", close:"17:00"},{enabled: true, open:"08:00", close:"17:00"},{enabled: true, open:"08:00", close:"17:00"},{enabled: true, open:"08:00", close:"17:00"},{enabled: true, open:"08:00", close:"17:00"},{enabled: true, open:"08:00", close:"17:00"},{enabled: true, open:"08:00", close:"17:00"}]
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
  components: { "hi-image-picker": HiImagePicker, "hi-check-open-close-time":checkOpenCloseTime },
};
</script>
<style>
.flex-box{
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;

}
.flex-box > * {
        flex: 1 1 0;
      }
</style>