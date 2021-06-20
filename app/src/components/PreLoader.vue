<template>
  <div class="preloader-container">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      <div class="center-align"><span class="badge"><slot></slot></span></div>
    </div>

  </div>
</template>
<script>
export default { name: "hi-preloader" };
</script>
<style scoped>
.preloader-container{
display: fixed;
top:50%;left:50%;
margin-top:-50%;
margin-left:-50%;
}
</style>
