<template>
  <div class="row">
    <div class="col s3" v-for="(c, ind) in cards" v-bind:key="ind">
      <hi-card :color="c.color" :title="c.title" :value="c.value" :icon="c.icon" />
    </div>
  </div>
</template>
<script>
import Card from "../components/Card.vue";

import webClient from "@/client_axios";
export default {
  name: "Home",
  mounted() {
      console.log("Home mounted");
      webClient.get("/dashboard/").then(res => {
          this.cards = res.data;
      });

  },
  data() {
    return {
      cards: [
      ],
    };
  },
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
