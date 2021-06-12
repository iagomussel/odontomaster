<template>
    
    <form method="POST" @submit.prevent="onSubmit" role="form">
        <div class="form-group">
            <label for="nome">Nome</label>
            <input id="nome" name="nome" v-model="formulario.nome" placeholder="Nome" type="text" required="required" >
        </div>
        <div class="form-group">
            <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
        </div>
    </form>

</template>
<script>
import webClient from "../../client_axios.js"

export default {
  data () {
    return {
      dataImages:[],
      formulario:{
        nome:""
      }
    }
  },
  methods: {
    onSubmit() {
      webClient.post("/convenios", this.formulario).then((res) => {
        console.log(res.data);
        if(res.data.id){
          this.formulario.nome = "";
          this.$router.push('/convenios');
        }
      
      })

    }
  },
  }
</script>