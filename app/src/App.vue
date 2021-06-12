<template>
<div>
  <NavBar title="Larodon"/>
    <div class="progress">
      <div class="determinate" style="width: 0"></div>
  </div>
    <div class="container section">
            <router-view />
  </div>
</div>
</template>

<script>
import NavBar from "./components/NavBar"
import M from 'materialize-css'
import webClient from './client_axios.js';

setTimeout(refresh_token,15000);
function refresh_token(){
  webClient.get('/refreshtoken').then(res=>{
    localStorage.setItem("user", JSON.stringify(res.data));
  }).catch(() =>{
    location.reload();
  })
  setTimeout(refresh_token,15000);
}
let App = {
  name: 'App',
}
App.components={NavBar};
App.watch={
  $route (){
    M.AutoInit();
  }
}
export default App
</script>



<style>

</style>
