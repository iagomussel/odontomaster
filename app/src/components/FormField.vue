<template>
  <div>
    <div class="row" v-for="(field, ind) in fields" v-bind:key="ind">
      <div class="col s12">
        <label class="active" :for="field.name">{{ field.label }}</label>
        <input
          v-model="item[field.name]"
          :type="field.type"
          :id="field.name"
          :name="field.name"
          :mask="field.mask"
          class="form-control"
          :placeholder="field.placeholder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  data() {
      return {}
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
    fields: {
      type: Array,
      default: () => {
        return [
          {
            name: {
              type: String,
              default: "name",
            },
            type: {
              type: String,
              default: "text",
            },
            mask: {
              type: String,
              default: "",
            },
            placeholder: {
              type: String,
              default: "",
            },
            label: {
              type: String,
              default: "",
            },
          },
        ];
      },
    },
  },
  directives: { mask },
  methods: {
    // ...
  },
  computed: {
    item:{
        get(){
            return this.modelValue;
        },
        set(val){
             this.$emit('update:modelValue', val)
        }
    }
  },
  name: "hi-form-field",
};
</script>
