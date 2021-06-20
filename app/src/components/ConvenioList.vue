<template>
      <hi-table
  url="/convenios"
  novo_url="/conveniod/novo"
  ver_url="/convenio/__id__"
  :filter_fields="filter_field"
  :headers="{'ID':'id','Nome':'nome'}"
    >
  </hi-table>
</template>
<script>

import TablesComponent from './tables.vue';


export default{
    props:{
        'url':String,
        'novo_url':String,
        'ver_url':String,
    },
    methods:{
        filter_field(field,value){
           return value
        }
    },
    components:{
        'hi-table':TablesComponent
    }
}
</script>