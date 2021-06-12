<template>
      <hi-table 
  url="/procedimentos"
  novo_url="/procedimentos/novo"
  ver_url="/procedimento/__id__"
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