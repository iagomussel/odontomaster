<template>
<div>

    <h1>Odontomaster</h1>
    <div><b>Authon:</b>Iago Mussel</div>
    <div><b>Build:</b>{{build}}</div>

    <a href="#" @click="openReporter"> encontrou um erro?</a>
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
        }
    },
};
</script>
