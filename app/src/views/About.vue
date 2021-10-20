<template>
<div>
    <h1>Odontomaster</h1>
    <div><b>Authon:</b>Iago Mussel</div>
    <div><b>Build:</b>{{build}}</div>
</div>
</template>

<script>

export default {
    data: ()=>{
        return {
            build: process.env.BUILD
        }
    }
};
</script>
