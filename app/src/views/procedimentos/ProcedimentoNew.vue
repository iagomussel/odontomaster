<template>

    <form method="POST" action="" @submit.prevent="onSubmit" role="form">
        <div class="form-group">
            <label  class="active" for="nome">Nome</label>
            <input id="nome" v-model="formulario.nome" name="nome" placeholder="Nome" type="text" required="required" >
        </div>
        <div class="form-group">
        <label  class="active" for="valor">Valor</label>
            <input id="valor" v-model="formulario.valor" name="valor" placeholder="valor" type="text" required="required" >
        </div>
        <div class="form-group">
            <label  class="active" for="duracao">Duração (Em minutos)</label>
            <input id="duracao" v-model="formulario.duracao"  name="duracao" placeholder="30" type="text" required="required" >
        </div>
        <div class="form-group">
            <label  class="active" for="periodicidade">Periodicidade (Em meses)</label>
            <input id="periodicidade" v-model="formulario.periodicidade" name="periodicidade" placeholder="0" type="text" required="required" >
        </div>
        <div class="form-group">
            <button name="submit" type="submit" class="btn btn-primary">Gravar</button>
        </div>
    </form>

</template>
<script>
import webClient from "@/client_axios";

export default {

  methods: {
    onSubmit() {
      webClient.post("/procedimentos", this.formulario).then((res) => {
        console.log(res.data);
        this.$router.push("/procedimentos");
      });
    },
  },
  data() {
    return {
      formulario: {
        nome: "",
        valor: "",
        duracao:"",
        periodicidade: "",
      },
    };
  },
  name: "ProcedimentoNovo",
};
</script>