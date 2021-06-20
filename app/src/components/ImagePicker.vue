<template>
  <div class="btn-file">
    <pre-loader v-show="loading">{{loaded}}</pre-loader>
    <img
      id="img_preview"
      class="circle responsive-img"
      :src="inputVal"
    />
    <input type="file" accept="image/*"  v-on:change="onUpdateFile" />
  </div>
</template>
<script>
import PreLoader from "./PreLoader";
import defaultImage from "../assets/logo.jpg";
import webClient from '../client_axios';
export default {
  name: "hi-image-picker",
  props: {
    modelValue: {
      type: String,
      default: defaultImage,
    },
  },
  data() {
    return {
      loading: false,
      loaded:0,
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.modelValue != "" && this.modelValue != null ? this.modelValue : defaultImage;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    onUpdateFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.createImage(files[0]);
    },
    async createImage(Myfile) {
      const data = new FormData();
      this.loading = true;
      data.append("file", Myfile, "filename");
      webClient.post("/upload", data, {
          onUploadProgress: (event) => {
            this.loaded = Math.round(
              (event.loaded * 100) / event.total
            );
          },
        }).then(res =>{
            console.log(res)
            this.inputVal = res.data
            this.loading =false
        })
      var reader = new FileReader();

      reader.onload = this.changeImage;

      reader.readAsDataURL(Myfile);
    },
    changeImage(e) {
      console.log(this.inputVal);
      this.inputVal = e.target.result;
    },
  },
  components: {
    PreLoader,
  },
};
</script>
<style scoped>
.btn-file {
  position: relative;
  overflow: hidden;
}

.btn-file input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
</style>
