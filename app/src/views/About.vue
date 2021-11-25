<template>
<div>

    <h1>Odontomaster</h1>
    <div><b>Authon:</b>Iago Mussel</div>
    <div><b>Build:</b>{{build}}</div>

    <div class="btn" @click="configurations"> Configurações</div>
    <div class="btn" @click="openReporter"> encontrou um erro?</div>

</div>
</template>

<script>

export default {
    data: ()=>{
        return {
            build: process.env.VUE_APP_BUILD
        }
    },
    methods: {
        openReporter(){
            this.$router.push({name: '.Report'})
        },
        configurations(){
            console.log(this.$router.options.routes)
        }
    },
};
</script>
