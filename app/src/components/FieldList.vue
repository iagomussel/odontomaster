<template>
  <div class="row">
    <div class="col s12 m12">
      <div class="card gray lighten-5">
        <div class="card-content black-text">
          <span class="card-title">{{ title }}</span>

          <table class="table table-borded table-hover table-sm">
            <thead>
              <tr>
                <th v-for="(field, index) in fields" :key="index">{{ field.label }}</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody class="tel_area">
              <tr v-for="(item, ind) in list" v-bind:key="ind">
                <td v-for="(field, field_ind) in fields" v-bind:key="field_ind">
                  <span>{{ item[field.name] }}</span>
                </td>
                <td>
                  <div
                    class="btn-floating btn-small waves-effect waves-light red"
                    @click="remove(item)"
                  >
                    <font-awesome-icon icon="trash" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-action">
          <div class="btn waves-effect waves-light" @click="openModalAdd()">
            <font-awesome-icon icon="plus" />Adicionar
          </div>
        </div>
      </div>
    </div>

    <hi-modal v-if="ShowModalAdd" @close="closeModalAdd">
      <template v-slot:header>
        <h4>{{ title }}</h4>
      </template>
      <template v-slot:body>
        <hi-form-field :fields="fields" v-model="form" />
      </template>
      <template v-slot:footer>
        <div class="btn waves-effect waves-light" @click="add()">
          <font-awesome-icon icon="save" />Salvar
        </div>
        <div class="btn waves-effect waves-light" @click="closeModalAdd()">
          <font-awesome-icon icon="times" />Fechar
        </div>
      </template>
    </hi-modal>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSave,
  faTimes,
  faPlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);
library.add(faPen);
library.add(faTrash);
library.add(faTimes);
library.add(faSave);

import HiModal from "@/components/Modal.vue";
import HiFormField from "@/components/FormField.vue";

export default {
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    fields: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    list: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  data() {
    return {
      ShowModalAdd: false,
      form: {},
    };
  },

  name: "hi-field-list",
  methods: {
    openModalAdd() {
      console.log("openModalAdd");
      this.ShowModalAdd = true;
    },
    add() {
      this.list.push(this.form);
      this.closeModalAdd();
    },

    remove(item) {
      this.list = this.list.filter((i) => i !== item);
    },
    closeModalAdd() {
      this.ShowModalAdd = false;
      this.form = {};
    },
  },
  components: {
    HiModal,
    HiFormField,
  },
};
</script>

<style></style>
