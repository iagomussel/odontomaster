<template>
  <hi-table
    url="/dentistas"
    novo_url="/dentistas/novo"
    ver_url="/dentista/__id__"
    :filter_fields="filter_field"
    :headers="{ ID: 'id', Avatar: 'imagem', Nome: 'nome' }"
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
          //return '<img src=\''+value+'\' class="img rounded"/>'
          return "<img src='" + value + '\' width=40 height=40 class="rounded-circle"/>';
      }
      return value;
    },
  },
  components: {
    "hi-table": TablesComponent,
  },
};
</script>
