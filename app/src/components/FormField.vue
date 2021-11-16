<template>
  <div>
    <div class="row" v-for="(field, ind) in fields" v-bind:key="ind">
      <div class="col s12">
        <label class="active" :for="field.name">{{ field.label }}</label>
        <input
          v-if="(field.type == 'text')"
          v-model="item[field.name]"
          :type="field.type"
          :id="field.name"
          :name="field.name"
          :mask="field.mask"
          class="form-control"
          :placeholder="field.placeholder"
        />
        <input
            v-if="(field.type == 'password')"

          :type="field.type"
          :id="field.name"
          :name="field.name"
          :mask="field.mask"
          class="form-control"
          :placeholder="field.placeholder"
          />

        <textarea
          v-if="field.type == 'textarea'"
          v-model="item[field.name]"
          :id="field.name"
          :name="field.name"
          class="form-control"
          :placeholder="field.placeholder"
        ></textarea>
        <hi-select
          v-if="field.type == 'hi-select'"
          v-model="item[field.name]"
          :id="field.name"
          :name="field.name"
          :options="field.options"
          class="form-control" />
        <hi-select-ajax
            v-if="field.type == 'hi-select-ajax'"
            v-model="item[field.name]"
            :id="field.name"
            :name="field.name"
            :url="field.url"
            :TextField="field.TextField"
            class="form-control" />

      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import HiSelect from "@/components/Select.vue";
import HiSelectAjax from "@/components/SelectAjax.vue";

export default {
  data() {
      return {}
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    TextField: {
      type: String,
      default: "",
    },
    options:{
        type: Array,
        default: () => []
    },
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
    components: {
        HiSelect,
        HiSelectAjax
    }
};
</script>
