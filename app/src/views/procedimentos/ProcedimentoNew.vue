<template>
    
    <form method="POST" action="" @submit.prevent="onSubmit" role="form">
        <div class="form-group">
            <label for="nome">Nome</label>
            <input id="nome" name="nome" placeholder="Nome" type="text" required="required" >
        </div>
        <div class="form-group">
            <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
        </div>
    </form>

</template>
<script>
import webClient from "@/client_axios";
import {mask} from 'vue-the-mask'

export default {
  created () {
      webClient.get('/dentistas').then((res)=>{
          console.log(res.data)
      })
  },
  methods: {
    onSubmit() {
      webClient.post("/pacientes", this.formulario).then((res) => {
        console.log(res.data);
      });
    },
  },
  data() {
    return {
    dentistas:[],
    convenios:[],
      formulario: {
        ficha: "",
        nome: "",
        data_nasc:"",
        email: "",
      },
    };
  },
  name: "ProcedimentoNovo",
  directives: {mask}
};
</script>