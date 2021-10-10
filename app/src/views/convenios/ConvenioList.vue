<template>
      <hi-table
  url="/convenios"
  novo_url="/convenios/novo"
  ver_url="/convenio/__id__"
  :filter_fields="filter_field"
  :headers="{'ID':'id','Nome':'nome'}"
    >
  </hi-table>
</template>
<script>

import TablesComponent from "../../components/tables.vue";


export default{
    methods:{
        filter_field:function(field,value){

            return value
        }
    },
    components:{
        'hi-table':TablesComponent
    }
}
</script>