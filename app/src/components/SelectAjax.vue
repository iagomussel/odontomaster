<template>
  <div>
    <multiselect
      :searchable="true"
      :clearOnSearch="true"
      :createTag="true"
      :filterResults="false"
      :resolveOnLoad="true"
      :delay="0"
      v-model="inputVal"
      :options="GetOption"
      ref="multiselect"
      addTagOn='tab'
      @tag="tag"
      @select="select_event"
      noOptionsText="Nenhum resultado encontrado"
      noResultText="Nenhum resultado encontrado"
    >
    </multiselect>
  </div>
</template>
<script>
import webClient from "../client_axios.js";
import Multiselect from "@vueform/multiselect";
export default {
  name: "hi-select-ajax",
  props: {
    url: String,
    modelValue: String,
    ValueField: {
      type: String,
      default: "id",
    },
    TextField: {
      type: String,
      default: "nome",
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    async GetOption(query) {
      let options = await webClient.get(this.url + (query ? "/1/" + query : ""));
      let filtred_option = options.data.docs.map((v) => {
        return {
          value: v,
          label: v[this.TextField],
        };

      });

      return filtred_option;
    },
    select_event(option) {
      this.$emit("select", option);
    },
    select(option){
        
        this.$refs.multiselect.refreshOptions(()=>{
                this.$refs.multiselect.select({value:option, label:option[this.TextField]});
         })

    }
  },
  components: {
    Multiselect,
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect {
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
  transition: box-shadow 0.3s, border 0.3s;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
}

.multiselect-input {
  border: none;
}
.multiselect-single-label {
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
  transition: box-shadow 0.3s, border 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, "Helvetica Neue", sans-serif;
}
</style>
