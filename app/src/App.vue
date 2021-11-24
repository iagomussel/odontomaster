<template>
  <div>
    <NavBar title="OdontoMaster" />
    <div class="progress">
      <div class="determinate" style="width: 0"></div>
    </div>
    <div class="container section">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import M from "materialize-css";
import webClient from "./client_axios.js";

setTimeout(refresh_token, 15000);
function refresh_token() {
  webClient
    .get("/refreshtoken")
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
    })
  setTimeout(refresh_token, 30000);
}
let App = {
  name: "App",
};
App.components = { NavBar };
App.watch = {
  $route() {
    M.AutoInit();
  },
};
export default App;
</script>

<style>
.container {
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important ;

}
@media only screen and (min-width: 993px){
    .container {
        padding: 50px  !important;
        margin: 0 !important;
        max-width: 100% !important;
        width: 100%  !important;
    }
}
</style>
