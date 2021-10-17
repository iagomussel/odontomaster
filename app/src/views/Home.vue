<template>
  <div class="row">
    <div class="col s3">
      <hi-card color="red" title="Pacientes" value="130"></hi-card>
    </div>
    <div class="col s3">
      <hi-card  color="blue" title="Consultas" value="60" obs="15 ainda não realizadas"></hi-card></div>
    <div class="col s3">
      <hi-card color="yellow" title="Consultas Canceladas" value="7"></hi-card></div>
    <div class="col s3">
      <hi-card color="green" title="Agenda livre" value="25%" ></hi-card></div>
  </div>
</template>
<script>
import Card from "../components/Card.vue";
export default {
  components: {
    "hi-card": Card,
  },
};
</script>

<style scoped>
img {
  margin: 0 auto;
  width: 100%;
}
</style>
