<template>
<div>
    <multiselect
      v-model="inputVal"
      :options="GetOption">
    </multiselect>
</div>
</template>
<script>
import webClient from '../client_axios.js';
import Multiselect from '@vueform/multiselect'
export default {
    name: "hi-select-ajax",
    props:{
        url:String,
        value:String
    },
    computed: {
        inputVal: {
        get() {
            return this.value;
        },
        set(val) {
            this.$emit('input', val);
        }
        }
    },
    methods:{
        async GetOption(){
            let option = await webClient.get(this.url)
            console.log(option.data.docs)
            let filtred_option = option.data.docs.map((v)=>{
                return {[v.id]:v.name}
            })
            return filtred_option
        }
    },
    components:{
        Multiselect
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect{
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    box-shadow: none;
    box-sizing: content-box;
    transition: box-shadow .3s, border .3s;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
}

.multiselect-input{
    border:none;

}
</style>