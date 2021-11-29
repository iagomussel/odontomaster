<template>
  <div>
      <h2>OdontoMaster Report a bug</h2>
    <p>
      Envie-nos uma mensagem sobre eventuais problemas com o software, estamos trabalhando
      para entregar um produto com cada vez mais qualidade

      Se preferir envie um email com este problema para himmussel@gmail.com
    </p>

    <form method="POST" action="" @submit.prevent="onSubmit" role="form">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          v-model="formulario.title"
          placeholder="Title"
        />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea
          class="form-control"
          id="description"
          name="description"
          v-model="formulario.description"
          placeholder="Description"
        ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          Enviar
        </button>

    </form>
  </div>
</template>
<script>
import webClient from "@/client_axios";

export default {
  methods: {
    onSubmit() {
      webClient.post("/report", this.formulario).then((res) => {
        console.log(res.data);
        this.$router.push("/reportTanks");
      });
    },
  },
  data() {
    return {
      formulario: {
          title:"",
          description:""
      },
    };
  },
  name: "ProcedimentoNovo",
};
</script>
