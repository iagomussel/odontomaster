<template>
  <div>
    <div class="row">
      <div class="col s12">
        <div class="card-panel" v-if="resumo">
          <div class="row" style="margin-bottom: 0">
            <div class="col s4 center-align">
              <h6>Receitas</h6>
              <h5 class="green-text">R$ {{ resumo.receitas }}</h5>
            </div>
            <div class="col s4 center-align">
              <h6>Despesas</h6>
              <h5 class="red-text">R$ {{ resumo.despesas }}</h5>
            </div>
            <div class="col s4 center-align">
              <h6>Saldo</h6>
              <h5 :class="resumo.saldo >= 0 ? 'green-text' : 'red-text'">
                R$ {{ resumo.saldo }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hi-table
      url="/financeiro"
      novo_url="/financeiro/novo"
      ver_url="/lancamento/__id__"
      :filter_fields="filter_field"
      :headers="{
        ID: 'id',
        Tipo: 'tipo',
        Descrição: 'descricao',
        Valor: 'valor',
        Data: 'data',
        Status: 'status',
      }"
    >
    </hi-table>
  </div>
</template>
<script>
import TablesComponent from "../../components/tables.vue";
import webClient from "@/client_axios";

export default {
  mounted() {
    webClient.get("/financeiro/resumo").then((res) => {
      this.resumo = res.data;
    });
  },
  data() {
    return {
      resumo: null,
    };
  },
  methods: {
    filter_field: function (field, value) {
      if (field === "valor") {
        return "R$ " + parseFloat(value).toFixed(2);
      }
      if (field === "tipo") {
        return value === "receita"
          ? '<span class="green-text">Receita</span>'
          : '<span class="red-text">Despesa</span>';
      }
      if (field === "status") {
        if (value === "pago") return '<span class="green-text">Pago</span>';
        if (value === "pendente")
          return '<span class="orange-text">Pendente</span>';
        if (value === "cancelado")
          return '<span class="red-text">Cancelado</span>';
      }
      return value;
    },
  },
  components: {
    "hi-table": TablesComponent,
  },
};
</script>
