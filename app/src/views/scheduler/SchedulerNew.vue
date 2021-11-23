<template>
  <form method="POST" @submit.prevent="onSubmit" role="form">
    <div>
      <div class="input-field">
        <label class="active">Paciente</label>
        <hi-select-ajax
          v-model="formulario.patient"
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

            ref="professional"
          @select="onProfessionalSelected"
          v-model="formulario.professional"
          url="dentistas"
          TextField="nome"
        />
      </div>
      <div class="input-field">
        <label class="active">Procedimento</label>
        <hi-select-ajax
            ref="procedimento"
          v-model="formulario.procedure"
          url="procedimentos"
          TextField="nome"
        />
      </div>
      <div v-if="!formulario.encaixe_id && formulario.professional" class="input-field">
        <label class="active">Data</label>
        <hi-select @select="onDateSelected" v-model="formulario.data" :options="datas" />
      </div>
      <div
        class="input-field"
        v-if="!formulario.encaixe_id && formulario.professional && formulario.data"
      >
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
import HiSelect from "../../components/Select.vue";
import { mask } from "vue-the-mask";
const moment = require("moment");
export default {
mounted(){
     let params = this.$route.query
    if( params.horario ) this.formulario.horario = params.horario
    if( params.data ) this.formulario.data = params.data

       if( params.dentista ) {
        webClient.get(`dentista/${params.dentista}`).then(response => {
            this.$refs.professional.select(response.data)
        })
    }
},
  data() {
    let dados = {
      dataImages: [],
      isNewPaciente: false,
      horarios: [],
      datas: [],
      formulario: {
        id: null,
        encaixe_id: null,
        professional: null,
        procedure: null,
        patient: null,
        data: "",
        horario: "",
      }}

    return dados;

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
        this.loadDates(professional);
    },
    onDateSelected(date){
        console.log(date)
        if (this.formulario.professional) {
            this.loadTimes(this.formulario.professional,date);
        }

    },
    loadTimes(professional,_date) {
      if (professional && _date) {
        let date = moment(_date, "DD/MM/YYYY");
        webClient
          .get(
            "/consultas/horarios/" +
              professional.id +
              "/" +
              date.format("DDMMYYYY")
          )
          .then((res) => {
            if (res.data) {
              this.horarios = res.data;
              if (this.formulario.horario == null && this.horarios.length > 0) {
                this.formulario.horario = this.horarios[0];
              } else {
                // check if the selected horario is in the list
                if (
                  this.horarios.filter((h) => h == this.formulario.horario).length == 0
                ) {
                  this.formulario.horario = this.horarios[0];
                }
              }
            } else {
              this.horarios = [];
            }
          });
      }
    },
    loadDates(professional) {
      if (professional) {
        webClient
          .get("/consultas/datas/" + professional.id)
          .then((res) => {
            if (res.data) {
              this.datas = res.data;
              // check if the selected date is in the list
              if (this.formulario.data == null && this.datas.length > 0) {
                this.formulario.data = this.datas[0];
              } else {
                if (this.datas.filter((h) => h == this.formulario.data).length == 0) {
                  this.formulario.data = this.datas[0];
                }

              }

              this.loadTimes(professional,this.formulario.data);
            } else {
              this.datas = [];
            }
          });
      }
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
    "hi-select": HiSelect,
  },
  directives: { mask },
};
</script>
