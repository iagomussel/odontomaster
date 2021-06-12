<template>
  <hi-table
    url="/pacientes"
    novo_url="/pacientes/novo"
    ver_url="/paciente/__id__"
    :filter_fields="filter_field"
    :headers="{
      Ficha: 'ficha',
      Avatar: 'imagem',
      Nome: 'nome',
      Dentista: 'destista_nome',
      Sexo: 'sexo',
      'Data de Nascimento': 'data_nasc',
    }"
  >
  </hi-table>
</template>
<script>
import TablesComponent from "../../components/tables.vue";
import moment from "moment";

export default {
  methods: {
    filter_field: function (field, value) {
      switch (field) {
        case "data_nasc":
          var nasc = moment(value);
          return nasc.format("DD/MM/Y");
        case "imagem":
          return (
            "<img src='" +
            value +
            '\' class="circle responsive-img" />'
          );
      }
      return value;
    }
  },
  components: {
    "hi-table": TablesComponent,
  },
};
</script>