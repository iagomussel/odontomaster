<template>
  <div>
    <multiselect
      v-model="inputVal"
      :options="options"
      :searchable="true"
      :createTag="true"
      :clearOnSearch="true"
      @select="select"
    >
      >
    </multiselect>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
export default {
  name: "hi-select",
  props: {
    modelValue: String,
    options: Array,
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
    select(option) {
      this.$emit("select", option);
    },
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
</style>
