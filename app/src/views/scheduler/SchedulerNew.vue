<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div>
      <div class="input-field">
        <label class="active">Paciente</label>
        <hi-select-ajax
          v-model="formulario.paciente"
          url="pacientes"
          TextField="nome"
          @change="onPacienteNew"
        />
      </div>
      <!-- FieldList Telefones-->
      <hi-field-list
        v-if="isNewPaciente"
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
          {
            type: 'hi-select',
            name: 'tipo',
            label: 'Tipo',
            placeholder: 'Tipo',
            label: 'Tipo',
            options: ['Celular', 'Fixo', 'Trabalho'],
          },
          {
            type: 'text',
            name: 'contato',
            label: 'Contato',
          },
        ]"
      />
      <div class="input-field" v-if="!formulario.encaixe_id">
        <label class="active">Dentista</label>
        <hi-select-ajax
          @select="onProfessionalSelected"
          v-model="formulario.professional"
          url="dentistas"
          TextField="nome"
        />
      </div>
      <div class="input-field">
        <label class="active">Procedimento</label>
        <hi-select-ajax
          v-model="formulario.procedure"
          url="procedimentos"
          TextField="nome"
        />
      </div>
      <div v-if="!formulario.encaixe_id && formulario.professional" class="input-field">
        <label class="active">Data</label>
        <input
          v-mask="'##/##/####'"
          v-model="formulario.data"
          placeholder="Data"
          type="text"
          required="required"
        />
      </div>
      <div class="input-field" v-if="!formulario.encaixe_id && formulario.professional">
        <label class="active">Horario</label>
        <hi-select v-model="formulario.horario" :options="horarios" />
      </div>
    </div>

    <div class="form-group">
      <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
    </div>
  </form>
</template>
<script>
import webClient from "../../client_axios.js";
import HiFieldList from "../../components/FieldList.vue";
import HiSelectAjax from "../../components/SelectAjax.vue";
import { mask } from "vue-the-mask";
const moment = require("moment");
export default {
  data() {
    return {
      dataImages: [],
      isNewPaciente: false,
      horarios: [],
      formulario: {
        id: null,
        encaixe_id: null,
        professional: null,
        procedimento: null,
        paciente: {},
        data: "",
        horario: "",
      },
    };
  },
  methods: {
    onSubmit() {
      webClient.post("/consulta", this.formulario).then((res) => {
        if (res.data) {
          let data = moment(this.formulario.data, "DD/MM/yyyy");
          this.$router.push({
            path: "/agenda",
            query: { dia: data.format("DD_MM_YYYY") },
          });
        }
      });
    },
    onProfessionalSelected(professional) {
      console.log(professional);
      webClient.post("/consultas/horarios/" + professional.id ).then((res) => {
        if (res.data) {
            this.horarios = res.data;

            if (this.formulario.horario == null &&this.horarios.length > 0) {
              this.formulario.horario = this.horarios[0];
            } else {
                // check if the selected horario is in the list
                if (this.horarios.filter(h => h == this.formulario.horario).length == 0) {
                    this.formulario.horario = this.horarios[0];
                }
            }
        } else {
          this.horarios = [];
        }
      });
    },
    onPacienteNew(e) {
      if (e.id) {
        this.isNewPaciente = false;
        this.formulario.paciente = e;
        this.formulario.phones = e.phones;
      } else {
        this.isNewPaciente = true;
        this.formulario.phones = [];
      }
      console.log(this.formulario.paciente);
    },
  },
  components: {
    "hi-select-ajax": HiSelectAjax,

    "hi-field-list": HiFieldList,
  },
  directives: { mask },
};
</script>
