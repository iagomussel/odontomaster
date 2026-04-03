<template>
  <div>
    <form method="POST" action="" @submit.prevent="onSubmit" role="form">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4 class="panel-title">Lançamento Financeiro</h4>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col s3">
              <label class="active" for="tipo">Tipo</label>
              <hi-select
                name="tipo"
                id="tipo"
                v-model="formulario.tipo"
                :options="['receita', 'despesa']"
              />
            </div>
            <div class="col s6">
              <label class="active" for="descricao">Descrição</label>
              <input
                type="text"
                v-model="formulario.descricao"
                id="descricao"
                name="descricao"
                placeholder="Descrição do lançamento"
                required
              />
            </div>
            <div class="col s3">
              <label class="active" for="valor">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                v-model="formulario.valor"
                id="valor"
                name="valor"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col s3">
              <label class="active" for="data">Data</label>
              <input
                type="text"
                v-model="formulario.data"
                id="data"
                name="data"
                v-mask="'##/##/####'"
                placeholder="DD/MM/AAAA"
                required
              />
            </div>
            <div class="col s3">
              <label class="active" for="forma_pagamento"
                >Forma de Pagamento</label
              >
              <hi-select
                name="forma_pagamento"
                id="forma_pagamento"
                v-model="formulario.forma_pagamento"
                :options="[
                  'Dinheiro',
                  'Cartão Crédito',
                  'Cartão Débito',
                  'PIX',
                  'Transferência',
                  'Boleto',
                  'Convênio',
                ]"
              />
            </div>
            <div class="col s3">
              <label class="active" for="status">Status</label>
              <hi-select
                name="status"
                id="status"
                v-model="formulario.status"
                :options="['pendente', 'pago', 'cancelado']"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <label class="active" for="paciente">Paciente</label>
              <hi-select-ajax
                v-model="formulario.patient"
                url="pacientes"
                text-field="nome"
              />
            </div>
            <div class="col s6">
              <label class="active" for="profissional">Profissional</label>
              <hi-select-ajax
                v-model="formulario.professional"
                url="dentistas"
                text-field="nome"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <label class="active" for="observacao">Observação</label>
              <textarea
                v-model="formulario.observacao"
                id="observacao"
                name="observacao"
                class="materialize-textarea"
                placeholder="Observações"
              ></textarea>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Gravar</button>
          <button type="reset" class="btn btn-default">Limpar</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import webClient from "@/client_axios";
import { mask } from "vue-the-mask";
import HiSelect from "../../components/Select.vue";
import HiSelectAjax from "../../components/SelectAjax.vue";

export default {
  mounted() {
    let id = this.$route.params.id;
    if (id) {
      webClient.get("/lancamento/" + id).then((res) => {
        this.formulario = { ...this.formulario, ...res.data };
      });
    }
  },
  methods: {
    onSubmit() {
      let payload = { ...this.formulario };
      if (payload.patient && payload.patient.id) {
        payload.patient_id = payload.patient.id;
      }
      if (payload.professional && payload.professional.id) {
        payload.professional_id = payload.professional.id;
      }
      webClient.post("/financeiro", payload).then((res) => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          this.$router.push("/financeiro");
        }
      });
    },
  },
  data() {
    return {
      formulario: {
        id: 0,
        tipo: "receita",
        descricao: "",
        valor: "",
        data: "",
        forma_pagamento: "Dinheiro",
        status: "pendente",
        observacao: "",
        patient: null,
        professional: null,
      },
    };
  },
  name: "FinanceiroNovo",
  directives: { mask },
  components: {
    "hi-select": HiSelect,
    "hi-select-ajax": HiSelectAjax,
  },
};
</script>
