<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div class="form-group">
      <label class="active" for="nome">Nome do Consultorio</label>
      <input
        id="nome"
        name="nome"
        v-model="formulario.CONSULTORIO_NAME"
        placeholder="Nome"
        type="text"
        required="required"
      />
    </div>
    <div class="form-group">
      <label class="active" for="nome">Endereço</label>
      <input
        id="nome"
        name="nome"
        v-model="formulario.CONSULTORIO_ADDRESS"
        placeholder="Endereço"
        type="text"
        required="required"
      />
    </div>
    <div class="form-group">
      <!-- FieldList Telefones-->
      <hi-field-list
        v-model="formulario.phones"
        title="Telefones"
        :fields="[
          {
            type: 'text',
            name: 'telefone',
            mask: '\'(##)#####-####\'',
            placeholder: '',
            label: 'Telefone',
          },
        ]"
      />
    </div>
    <div class="row">
      <div class="col s4">
        <div class="form-group">
          <label class="active" for="nome">Abre as:</label>
          <input
            id="nome"
            name="nome"
            v-model="formulario.CONSULTORIO_OPEN"
            v-mask="'##:##'"
            placeholder="00:00"
            type="text"
            required="required"
          />
        </div>
      </div>
      <div class="col s4">
        <div class="form-group">
          <label class="active" for="nome">Fecha as:</label>
          <input
            v-mask="'##:##'"
            v-model="formulario.CONSULTA_CLOSE"
            placeholder="00:00"
            type="text"
            required="required"
          />
        </div>
      </div>
      <div class="col s4">
        <div class="form-group">
          <label class="active" for="nome">Tempo padrão para consulta:</label>
          <input
            v-mask="'##'"
            v-model="formulario.CONSULTA_DURATION"
            placeholder="00:00"
            type="text"
            required="required"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
    </div>
  </form>
</template>
<script>
import webClient from "../client_axios.js";
import { mask } from "vue-the-mask";
import HiFieldList from "../components/FieldList.vue";
export default {
  mounted() {
    console.log("inited");
  },
  data() {
    return {
      formulario: {
        CONSULTORIO_NAME: "",
        CONSULTORIO_ADDRESS: "",
        CONSULTORIO_PHONE: "",
        CONSULTORIO_OPEN: "",
        CONSULTORIO_CLOSE: "",
      },
    };
  },
  methods: {
    onSubmit() {
      webClient.post("/configurations", this.formulario).then((res) => {
        console.log(res.data);
      });
    },
  },
  components: {
    HiFieldList,
  },
  directives: { mask },
};
</script>
