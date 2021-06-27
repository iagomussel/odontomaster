<template>
  <div>
    <input type="text" v-mask="'##/##/####'" v-model="dia" class="data center-align"/>
    <div
      class="row"
      v-bind:style="{ height: horariosList().length * 29 + 'px' }"
    >
      <!-- coluna dos horarios-->
      <div class="col s1 p-0 h-100">
        <div class="center-align section_name">
          <span>#</span>
        </div>
        <div class="events-container h-100">
          <div
            class="events-container-overlay w-100 valign-wrapper center-align"
            v-for="horario in horariosList()"
            v-bind:key="horario"
            v-bind:style="{
              top: position_horario(horario) + '%',
              height: tamanho_espaco(horario) + '%',
            }"
          >
            <span>{{ horario }}</span>
          </div>
          <div
            class="events-container-overlay horarios_row center-align linha"
            v-bind:style="barra_hora"
          >
            {{ hora_atual }}
          </div>
        </div>
      </div>
      <!-- coluna dos agenda dosdentistas-->
      <div class="col divide s11 h-100">
        <div
          v-bind:key="section.id"
          v-for="section in dados.agendamentos"
          class=" w-100 p-0"
        >
          <div class="valign-wrapper section_name">
            <span class="center-align w-100">{{ section.nome }}</span>
          </div>
          <div class="m-0 events-container  h-100">
            <div
              class="events-container-overlay cell w-100"
              v-for="horario in horariosList()"
              v-bind:key="horario"
              v-bind:style="{
                top: position_horario(horario) + '%',
                height: tamanho_espaco(horario) + '%',
              }"
              v-on:dblclick="agendar(section.id, horario)"
            ></div>

            <div
              class="events-container-overlay evento"
              v-on:dblclick="ver_agendamento(evento)"
              v-for="evento in section.eventos"
              v-bind:key="evento.id"
              v-bind:style="{
                top: position_horario(evento.horario) + '%',
                height:
                  tamanho_horario(evento.horario, evento.horario_termino) + '%',
              }"
            >    <div class="tool-container">
                <div
                  class="d-flex justify-content-between align-items-center pl-2"
                >
                  <small class="paciente_nome">{{
                    evento.paciente_nome
                  }}</small>

                  <span class="horario"
                    >{{ evento.horario }} - {{ evento.horario_termino }}</span
                  >
                </div>
              </div></div>
             <div
            class="events-container-overlay linha"
            v-bind:style="barra_hora"
          ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import webClient from '@/client_axios';
import moment from "moment";

export default {
  created() {
    this.verdia(0);
    this.get_barra_horario();
  },
  data() {
    return {
      barra_hora: {
        top: 0,
      },
      hora_atual: "",
      dia: new moment().format("DD/MM/yyyy"),
      horario_inicio: "8:00",
      horario_final: "23:59",
      intervalo: 30,
      dados: {
        agendamentos: [
          { nome: "general", eventos: [] },

          { nome: "general2", eventos: [] },

          { nome: "general3", eventos: [] },
        ],
      },
    };
  },
  methods: {
    verdia(desloc) {
      console.log(desloc)
      let d =moment(this.dia).add( "Days",desloc);
      this.get_data(d.format("DD_MM_YYYY"));
    },
    agendar(){
      this.$router.push("/agenda/novo")
      console.log('agendado')
    },
    get_data(data){
      webClient.get('/consultas/'+data).then(res => {
        console.log(res.data)
        this.dados.agendamentos = res.data
      })
      console.log(data);
    },
    horariosList: function() {
      var horarios = [];
      var v_inicial = moment(this.horario_inicio, "H:m");
      var v_final = moment(this.horario_final, "H:m");
      var v_intervalo = this.intervalo;
      while (v_inicial < v_final) {
        horarios.push(v_inicial.format("HH:mm"));
        v_inicial.add(v_intervalo, "Minutes");
      }
      return horarios;
    },
    position_horario(evento) {
      //obter valores
      var v_inicial = moment(this.horario_inicio, "H:m");
      var v_final = moment(this.horario_final, "H:m");
      var v_evento = moment(evento, "H:m");
      //calcular porcentagem para saber a altura do evento em relação ao quadro
      return this.get_porcent_horario(v_inicial, v_final, v_evento);
    },
    tamanho_horario(inicio, fim) {
      //obter valores
      var v_inicial = moment(this.horario_inicio, "H:m");
      var v_final = moment(this.horario_final, "H:m");
      var v_inicio_ev = moment(inicio, "H:m");
      var v_fim = moment(fim, "H:m");
      var dif_evento = v_fim.diff(v_inicio_ev, "seconds");

      var v_tamanho_ev = moment(this.horario_inicio, "H:m").add(
        dif_evento,
        "seconds"
      );
      //calcular porcentagem para saber a altura do evento em relação ao quadro
      return this.get_porcent_horario(v_inicial, v_final, v_tamanho_ev);
    },
    tamanho_espaco(inicio) {
      var v_inicio = moment(inicio, "H:m");
      var v_intervalo = this.intervalo;
      var v_fim = v_inicio.add(v_intervalo, "Minutes");
      var fim = v_fim.format("H:m");
      return this.tamanho_horario(inicio, fim);
    },
    get_porcent_horario(inicio, fim, current) {
      //totas de minutos no dia

      var diff_total = inicio.diff(fim, "seconds");
      var diff_evento = inicio.diff(current, "seconds");
      var percent = (diff_evento / diff_total) * 100;
      return percent < 100 ? percent : 100;
    },
        get_barra_horario() {
      var v_inicial = moment(this.horario_inicio, "H:m");
      var v_final = moment(this.horario_final, "H:m");
      var v_evento = moment();
      this.hora_atual = v_evento.format("HH:mm:ss");
      if (v_inicial > v_evento || v_final < v_evento) {
        this.barra_hora.display = "none";
      } else {
        this.barra_hora.display = "block";
      }
      this.barra_hora.top =
        this.get_porcent_horario(v_inicial, v_final, v_evento) + "%";
      var self = this;
      //calcular porcentagem para saber a altura do evento em relação ao quadro
      setTimeout(function () {
        self.get_barra_horario();
      }, 1000);
    },
  },
  directives: { mask },
};

</script>

<style scoped>
@media only screen and (min-width: 993px){
.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 90% !important;
  padding:0;
}
}


.row .col {
  margin: 0;
  padding: 0;
}
.h-100 {
  height: 100%;
}
.w-100 {
  width: 100%;
}
.section_name {
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  height: 50px;
  vertical-align: middle;
  outline: black thin solid;
}
.section_name span {
  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
}

.events-container {
  position: relative;
}

.events-container .cell {
  border-top: thin solid black;
  background-color: white;
  box-shadow: -3px 0px 0px 0px rgba(0, 0, 0, 0.34) inset;
  -webkit-box-shadow: -3px 0px 0px 0px rgba(0, 0, 0, 0.34) inset;
  -moz-box-shadow: -3px 0px 0px 0px rgba(0, 0, 0, 0.34) inset;
  height: 40px;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.events-container .cell:hover {
  background-color: #EE6E73;
}

.bg_traced {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD6CAYAAABgQC1TAAAAGklEQVQ4jWNgGAWjgPbAwcHhP1ZiFIwCmgIAOzwIvNFbSNwAAAAASUVORK5CYII=");
  background-repeat: repeat-y;
  background-size: 100% 40px;
}

.events-container-overlay {
  position: absolute;
  z-index: 2;

  border-left: 2px groove #000;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.evento {
  background-color: #165C9A;
  border: thin solid #fff;
  width: 98%;
  min-height: 25px;
  top: 0;
  left: 0;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.evento .paciente_nome {
  display: block;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  color: black;
  width: 70%;
}
.evento .horario {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  background-color: white;
  border-radius: 2px;

  font-size: 8px;
  color: black;
}

.evento .description {
  display: hidden;
}
.linha {
  border-top: 1px solid #94C557;
  width: 100%;
}

.horarios_row {
  height: 26px;
  margin-top: -13px;
  border: 1px solid #EE6E73;
  background-color: #fff;
  border-radius: 13px;
  -moz-border-radius: 13px;
  -webkit-border-radius: 13px;
}

.evento .tool-container {
  position: relative;
  height: 100%;
  transition-duration: 4s;
}

.evento .tool-container .tools {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition-duration: 4s;
}

.evento .tool-container:hover .tools {
  height: auto;
}

.btn-rounded {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
}
.divide {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: space-between;
}
</style>
