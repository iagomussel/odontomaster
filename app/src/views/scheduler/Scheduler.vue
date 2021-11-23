<template>
  <div>
    <div class="row">
      <div class="col s1"></div>
      <div class="col s1">
        <a class="btn" style="margin: 0 auto" v-on:click="verdia(-1)">Anterior</a>
      </div>
      <div class="col s8">
        <input
          type="text"
          v-mask="'##/##/####'"
          v-model="dia"
          class="data center-align"
        />
      </div>
      <div class="col s1">
        <a class="btn" style="margin: 0 auto" v-on:click="verdia(1)">Próximo</a>
      </div>
    </div>
    <div class="row" v-bind:style="{ height: horariosList().length * 29 + 'px' }">
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
          class="w-100 p-0"
        >
          <div class="valign-wrapper section_name">
            <span class="center-align w-100">{{ section.nome }}</span>
          </div>
          <div class="m-0 events-container h-100">
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
              :class="evento.encaixe ? 'hasEncaixe' : evento.encaixe_id ? 'encaixe' : ''"
              v-on:dblclick="ver_agendamento(evento)"
              v-for="evento in section.consultation"
              v-bind:key="evento.id"
              v-bind:style="{
                top: position_horario(evento.horario) + '%',
                height: tamanho_horario(evento.horario, evento.horario_termino) + '%',
              }"
            >
              <div class="tool-container">
                <div class="d-flex justify-content-between align-items-center pl-2">
                  <small class="paciente_nome">
                    {{
                      evento.paciente != null && evento.paciente
                        ? evento.paciente.nome
                        : evento.paciente
                    }}</small
                  >
                  <div class="complete_event_description">
                    {{
                      evento.paciente != null && evento.paciente
                        ? "Paciente: " + evento.paciente.nome
                        : evento.paciente
                    }}<br />
                    {{
                      evento.paciente != null &&
                      evento.paciente.telefones.length > 0 &&
                      evento.paciente.telefones[0].telefone != null
                        ? "Telefone: " + evento.paciente.telefones[0].telefone
                        : "Sem telefone cadastrado"
                    }}<br />
                    {{
                      evento.procedimento != null && evento.procedimento
                        ? "Procedimento: " + evento.procedimento.nome
                        : evento.procedimento
                    }}<br />
                    <a
                      href="#"
                      class="waves-effect waves-light btn-small"
                      v-on:click="desagendar(evento.id)"
                      >Desmarcar</a
                    >
                  </div>
                  <a
                    href="#"
                    class="encaixe_btn"
                    v-on:click="
                      agendar_encaixe(evento.dentista_id, evento.horario, evento.id)
                    "
                  >
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g
                        id="🔍-Product-Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="ic_fluent_calendar_add_24_regular"
                          fill="#ffffff"
                          fill-rule="nonzero"
                        >
                          <path
                            d="M17.5,12 C20.5375661,12 23,14.4624339 23,17.5 C23,20.5375661 20.5375661,23 17.5,23 C14.4624339,23 12,20.5375661 12,17.5 C12,14.4624339 14.4624339,12 17.5,12 Z M17.75,3 C19.5449254,3 21,4.45507456 21,6.25 L21.0012092,12.0225923 C20.5377831,11.7257502 20.0341997,11.4861106 19.5004209,11.3136354 L19.5,8.5 L4.5,8.5 L4.5,17.75 C4.5,18.7164983 5.28350169,19.5 6.25,19.5 L11.3136354,19.5004209 C11.4861106,20.0341997 11.7257502,20.5377831 12.0225923,21.0012092 L6.25,21 C4.45507456,21 3,19.5449254 3,17.75 L3,6.25 C3,4.45507456 4.45507456,3 6.25,3 L17.75,3 Z M17.5,14 L17.4101244,14.0080557 C17.2060313,14.0450996 17.0450996,14.2060313 17.0080557,14.4101244 L17,14.5 L17,17 L14.5,17 L14.4101244,17.0080557 C14.2060313,17.0450996 14.0450996,17.2060313 14.0080557,17.4101244 L14,17.5 L14.0080557,17.5898756 C14.0450996,17.7939687 14.2060313,17.9549004 14.4101244,17.9919443 L14.5,18 L17,18 L17,20.5 L17.0080557,20.5898756 C17.0450996,20.7939687 17.2060313,20.9549004 17.4101244,20.9919443 L17.5,21 L17.5898756,20.9919443 C17.7939687,20.9549004 17.9549004,20.7939687 17.9919443,20.5898756 L18,20.5 L18,18 L20.5,18 L20.5898756,17.9919443 C20.7939687,17.9549004 20.9549004,17.7939687 20.9919443,17.5898756 L21,17.5 L20.9919443,17.4101244 C20.9549004,17.2060313 20.7939687,17.0450996 20.5898756,17.0080557 L20.5,17 L18,17 L18,14.5 L17.9919443,14.4101244 C17.9549004,14.2060313 17.7939687,14.0450996 17.5898756,14.0080557 L17.5,14 Z M17.75,4.5 L6.25,4.5 C5.28350169,4.5 4.5,5.28350169 4.5,6.25 L4.5,7 L19.5,7 L19.5,6.25 C19.5,5.28350169 18.7164983,4.5 17.75,4.5 Z"
                            id="🎨-Color"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </a>
                  <span class="horario">{{ evento.horario }}</span>
                </div>
              </div>
            </div>
            <div class="events-container-overlay linha" v-bind:style="barra_hora"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import webClient from "@/client_axios";
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
      dia: moment().format("DD/MM/yyyy"),
      horario_inicio: "8:00",
      horario_final: "17:00",
      intervalo: 30,
      dados: {
        agendamentos: [
          { nome: "Carregando...", consulta: [] },
          { nome: "Carregando...", consulta: [] },
          { nome: "Carregando...", consulta: [] },
          { nome: "Carregando...", consulta: [] },
        ],
      },

      ...this.$route.query,
    };
  },
  methods: {
    verdia(desloc) {
      let d = moment(this.dia, "DD/MM/yyyy").add(1 * desloc, "Days");
      this.dia = d.format("DD/MM/yyyy");
      this.get_data(d.format("DD_MM_YYYY"));
    },
    agendar(dentista, horario) {
      this.$router.push({
        path: "/agenda/novo",
        query: { dentista, horario, data: this.dia },
      });
    },
    desagendar(consulta_id) {
      webClient.get("/consultas/unschedule/" + consulta_id).then((res) => {
        if (res.data.status == "ok") {
          this.verdia(0);
        }
      });
    },
    agendar_encaixe(dentista, horario, encaixe_id) {
      this.$router.push({
        path: "/agenda/novo",
        query: { dentista, horario, data: this.dia, encaixe_id },
      });
    },
    ver_agendamento(consulta) {
      this.$router.push({
        path: "/agenda/novo",
        query: {
          id: consulta.id,
          encaixe_id: consulta.encaixe_id,
          dentista: consulta.dentista_id,
          horario: consulta.horario,
          data: this.dia,
          procedimento: consulta.procedimento_id,
          paciente: consulta.paciente_id,
        },
      });
    },
    get_data(data) {
      webClient.get("/consultas/" + data).then((res) => {
        this.dados.agendamentos = res.data;
      });
    },
    horariosList: function () {
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

      var v_tamanho_ev = moment(this.horario_inicio, "H:m").add(dif_evento, "seconds");
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
      this.barra_hora.top = this.get_porcent_horario(v_inicial, v_final, v_evento) + "%";
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
@media only screen and (min-width: 993px) {
  .container {
    margin: 0 auto;
    max-width: 1280px;
    width: 90% !important;
    padding: 0;
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
  background-color: #ee6e73;
}

.bg_traced {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD6CAYAAABgQC1TAAAAGklEQVQ4jWNgGAWjgPbAwcHhP1ZiFIwCmgIAOzwIvNFbSNwAAAAASUVORK5CYII=");
  background-repeat: repeat-y;
  background-size: 100% 40px;
}

.events-container-overlay {
  position: absolute;

  border-left: 1px solid #000;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.evento {
  -webkit-box-shadow: 2px 0px 22px -2px rgba(0, 0, 0, 0.51);
  box-shadow: 2px 0px 22px -2px rgba(0, 0, 0, 0.51);
  background-color: #165c9a;
  width: 100%;
  min-height: 25px;
  top: 0;
  left: 0;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
.evento .encaixe_btn {
  display: block;
  position: absolute;
  top: 0;
  right: 20px;
  padding: 2px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
}
.evento.encaixe .encaixe_btn,
.evento.hasEncaixe .encaixe_btn {
  display: none;
}
.evento.encaixe {
  background-color: #5e9a16;
  left: 50%;
  width: 50%;
}
.evento.hasEncaixe {
  left: 0;
  width: 50%;
}
.evento .paciente_nome {
  display: block;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  padding: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgb(255, 255, 255);
  width: 70%;
}
.evento .complete_event_description {
  min-width: 100%;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0px;
  top: 56px;
  transform: translate(0, 10px);
  background-color: #bfbfbf;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  padding: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
}
.evento:hover .complete_event_description {
  z-index: 1;
  opacity: 1;
  visibility: visible;
  transform: translate(0, -25px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}
.evento .horario {
  display: none;
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
  border-top: 1px solid #94c557;
  width: 100%;
}

.horarios_row {
  height: 26px;
  margin-top: -13px;
  border: 1px solid #ee6e73;
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
