<template>
  <div>
    <form role="form" @submit.prevent="onSubmit" method="post">
      <input type="hidden" v-model="formulario.id" />

      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4 class="panel-title">
            Anamnese - {{ pacienteNome }}
          </h4>
        </div>
        <div class="panel-body">

          <!-- Saude Geral -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">Saude Geral</h5>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col s12">
                  <hi-checkbox
                    v-model="formulario.esta_em_tratamento_medico"
                    label="Esta em tratamento medico?"
                  />
                  <div v-if="formulario.esta_em_tratamento_medico" class="row">
                    <div class="col s12">
                      <label class="active">Descreva o tratamento:</label>
                      <textarea
                        v-model="formulario.tratamento_medico_descricao"
                        class="materialize-textarea"
                        placeholder="Descreva o tratamento medico atual"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <hi-checkbox
                    v-model="formulario.esta_tomando_medicamento"
                    label="Esta tomando algum medicamento?"
                  />
                  <div v-if="formulario.esta_tomando_medicamento" class="row">
                    <div class="col s12">
                      <label class="active">Quais medicamentos?</label>
                      <textarea
                        v-model="formulario.medicamento_descricao"
                        class="materialize-textarea"
                        placeholder="Liste os medicamentos"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <hi-checkbox
                    v-model="formulario.possui_alergia"
                    label="Possui alguma alergia?"
                  />
                  <div v-if="formulario.possui_alergia" class="row">
                    <div class="col s12">
                      <label class="active">Quais alergias?</label>
                      <textarea
                        v-model="formulario.alergia_descricao"
                        class="materialize-textarea"
                        placeholder="Descreva as alergias"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Condicoes Medicas -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">Condicoes Medicas</h5>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col s6 m4" v-for="cond in condicoesMedicas" :key="cond.field">
                  <hi-checkbox
                    v-model="formulario[cond.field]"
                    :label="cond.label"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Habitos -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">Habitos</h5>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col s6 m4">
                  <hi-checkbox v-model="formulario.fumante" label="Fumante" />
                </div>
                <div class="col s6 m4">
                  <hi-checkbox v-model="formulario.consumo_alcool" label="Consumo de alcool" />
                </div>
                <div class="col s6 m4">
                  <hi-checkbox v-model="formulario.bruxismo" label="Bruxismo" />
                </div>
              </div>
            </div>
          </div>

          <!-- Saude Bucal -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">Saude Bucal</h5>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col s6 m4">
                  <hi-checkbox v-model="formulario.sangramento_gengival" label="Sangramento gengival" />
                </div>
                <div class="col s6 m4">
                  <hi-checkbox v-model="formulario.sensibilidade_dental" label="Sensibilidade dental" />
                </div>
                <div class="col s6 m4">
                  <hi-checkbox v-model="formulario.dor_atm" label="Dor na ATM" />
                </div>
              </div>
            </div>
          </div>

          <!-- Informacoes para Mulheres -->
          <div class="panel panel-default" v-if="showFemaleFields">
            <div class="panel-heading">
              <h5 class="panel-title">Informacoes Adicionais</h5>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col s6">
                  <hi-checkbox v-model="formulario.gestante" label="Gestante" />
                </div>
                <div class="col s6">
                  <hi-checkbox v-model="formulario.lactante" label="Lactante" />
                </div>
              </div>
            </div>
          </div>

          <!-- Campos Livres -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h5 class="panel-title">Informacoes Complementares</h5>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col s12">
                  <label class="active">Cirurgias anteriores:</label>
                  <textarea
                    v-model="formulario.cirurgias_anteriores"
                    class="materialize-textarea"
                    placeholder="Descreva cirurgias anteriores"
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <label class="active">Observacoes:</label>
                  <textarea
                    v-model="formulario.observacoes"
                    class="materialize-textarea"
                    placeholder="Observacoes gerais"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Salvar Anamnese</button>
          <button type="button" class="btn btn-default" @click="$router.back()">Voltar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import webClient from "@/client_axios";

const HiCheckbox = {
  props: { modelValue: Boolean, label: String },
  emits: ['update:modelValue'],
  template: `
    <label>
      <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
      <span>{{ label }}</span>
    </label>
  `
};

export default {
  name: "AnamneseForm",
  components: { "hi-checkbox": HiCheckbox },
  props: {
    patientId: { type: [String, Number], default: null },
    patientSexo: { type: String, default: null },
  },
  data() {
    return {
      pacienteNome: "",
      sexoFromPatient: null,
      formulario: {
        id: null,
        esta_em_tratamento_medico: false,
        tratamento_medico_descricao: "",
        esta_tomando_medicamento: false,
        medicamento_descricao: "",
        possui_alergia: false,
        alergia_descricao: "",
        diabetes: false,
        hipertensao: false,
        problemas_cardiacos: false,
        problemas_respiratorios: false,
        problemas_renais: false,
        problemas_hepaticos: false,
        problemas_gastrointestinais: false,
        problemas_articulares: false,
        disturbios_sanguineos: false,
        epilepsia: false,
        hiv_positivo: false,
        hepatite: false,
        fumante: false,
        consumo_alcool: false,
        bruxismo: false,
        sangramento_gengival: false,
        sensibilidade_dental: false,
        dor_atm: false,
        gestante: false,
        lactante: false,
        cirurgias_anteriores: "",
        observacoes: "",
      },
      condicoesMedicas: [
        { field: "diabetes", label: "Diabetes" },
        { field: "hipertensao", label: "Hipertensao" },
        { field: "problemas_cardiacos", label: "Problemas Cardiacos" },
        { field: "problemas_respiratorios", label: "Problemas Respiratorios" },
        { field: "problemas_renais", label: "Problemas Renais" },
        { field: "problemas_hepaticos", label: "Problemas Hepaticos" },
        { field: "problemas_gastrointestinais", label: "Problemas Gastrointestinais" },
        { field: "problemas_articulares", label: "Problemas Articulares" },
        { field: "disturbios_sanguineos", label: "Disturbios Sanguineos" },
        { field: "epilepsia", label: "Epilepsia" },
        { field: "hiv_positivo", label: "HIV Positivo" },
        { field: "hepatite", label: "Hepatite" },
      ],
    };
  },
  computed: {
    showFemaleFields() {
      return this.patientSexo === "F" || this.sexoFromPatient === "F";
    },
    resolvedPatientId() {
      return this.patientId || this.$route.params.patient_id;
    }
  },
  mounted() {
    this.loadPatient();
    const anamneseId = this.$route.params.anamnese_id;
    if (anamneseId) {
      this.loadAnamnese(anamneseId);
    }
  },
  methods: {
    loadPatient() {
      webClient.get("/paciente/" + this.resolvedPatientId).then((res) => {
        this.pacienteNome = res.data.nome;
        if (!this.patientSexo) {
          this.sexoFromPatient = res.data.sexo;
        }
      });
    },
    loadAnamnese(id) {
      webClient.get("/anamnese/" + id).then((res) => {
        this.formulario = { ...this.formulario, ...res.data };
      });
    },
    onSubmit() {
      webClient
        .post("/anamnese/" + this.resolvedPatientId, this.formulario)
        .then((res) => {
          if (res.data.error) {
            console.log(res.data);
          } else {
            this.$router.push("/paciente/" + this.resolvedPatientId);
          }
        });
    },
  },
};
</script>
