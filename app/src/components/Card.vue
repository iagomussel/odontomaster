<template>
  <div :class="'card prod-p-card card-' + color">
    <div class="card-body">
      <div class="row align-items-center m-b-30">
        <div class="col">
          <h6 class="m-b-5 text-white">{{ title }}</h6>
          <h3 class="m-b-0 f-w-700 text-white">{{ value }}</h3>
        </div>
        <div class="col-auto">
          <font-awesome-icon icon="user-secret" size="3x" :style="{ color }" />
        </div>
      </div>
      <p class="m-b-0 text-white">
        {{ obs }}
      </p>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "red",
    },
    value: {
      type: String,
      default: "",
    },
    obs: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  name: "hi-card",
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
};
</script>
<style scoped>
.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%);
  box-shadow: 0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-red::after {
  background: #ff5370;
}
.card-blue::after {
  background: #4099ff;
}
.card-green::after {
  background: #2ed8b6;
}
.card-yellow::after {
  background: #ffb64d;
}
.card-blue:after,
.card-green:after,
.card-red:after,
.card-yellow:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
}
.card-blue .card-block,
.card-blue .card-block-big,
.card-blue .card-block-small,
.card-blue .card-body,
.card-blue .card-footer,
.card-blue .card-header,
.card-green .card-block,
.card-green .card-block-big,
.card-green .card-block-small,
.card-green .card-body,
.card-green .card-footer,
.card-green .card-header,
.card-red .card-block,
.card-red .card-block-big,
.card-red .card-block-small,
.card-red .card-body,
.card-red .card-footer,
.card-red .card-header,
.card-yellow .card-block,
.card-yellow .card-block-big,
.card-yellow .card-block-small,
.card-yellow .card-body,
.card-yellow .card-footer,
.card-yellow .card-header {
  position: relative;
  z-index: 5;
}
.text-white {
  color: #fff !important;
}
.m-b-5 {
  margin-bottom: 5px;
}
.m-b-0 {
  margin-bottom: 0px;
}
</style>
