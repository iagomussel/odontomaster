<template>
  <hi-table
    url="/pacientes"
    novo_url="/pacientes/novo"
    ver_url="/paciente/__id__"
    :filter_fields="filter_field"
    :headers="{
      Ficha: 'ficha',
      Imagem: 'imagem',
      Nome: 'nome',
      Dentista: 'dentista',
      Sexo: 'sexo',
      'Data de Nascimento': 'data_nasc',
    }"
  >
  </hi-table>
</template>
<script>
import TablesComponent from "../../components/tables.vue";

export default {
  methods: {
    filter_field: function (field, value) {
      switch (field) {
        case "imagem":
          return (
            '<div style="width:32px"><img src=\'' +
            value +
            '\'  class="circle responsive-img" /></div>'
          );
        case "dentista":
          if (value == null || value.nome == undefined) return "-";
          else return value.nome | "-";
      }
      console.log("field: " + field + " value: " + value);
      return value;
    },
  },
  components: {
    "hi-table": TablesComponent,
  },
};
</script>
