<template>
  <hi-table
    url="/pacientes"
    novo_url="/pacientes/novo"
    ver_url="/paciente/__id__"
    import_url="/pacientes/import"
    :filter_fields="filter_field"
    :headers="{
      Ficha: 'ficha',
      Imagem: 'imagem',
      Nome: 'nome',
      Convenio: 'agreements',
      Dentista: 'professionals',
      Sexo: 'sexo',
      Cidade: 'addresses',
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
          return  '<img src=\''+value+'\' width=40 height=40 class="rounded-circle"/>';
        case "professionals":
            return value.map((item) => item.nome).join(", ");
        case "addresses":
            return value.map((item) => item.cidade).join(", ");
        case "agreements":
            return value.map((item) => item.nome).join(", ");
      }
      return value;
    },
  },
  components: {
    "hi-table": TablesComponent,
  },
};
</script>
