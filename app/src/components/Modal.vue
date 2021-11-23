<template>
  <div class="modal" id="modal-one" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-header">
        <slot name="header"> </slot>
        <div class="btn-close" @click="close()">×</div>
      </div>
      <div class="modal-body">
        <slot name="body"> default body </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <div class="btn">Nice!</div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hi-modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: block;
  overflow: hidden;
  outline: 0;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}
.modal-body {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  padding: 20px;
  margin: 20px;
}
.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  color: #999;
}

.modal-header .btn-close {
  color: #999;
  text-decoration: none;
  position: absolute;
  top: 5px;
  right: 5px;
}
.modal-header .btn-close:hover {
  color: #000;
  text-decoration: underline;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
.modal-footer .btn {
  margin-left: 5px;
}
</style>
