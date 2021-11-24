<template>
  <div class="container-form">
    <form @submit.prevent="onSubmit" class="form">
      <div class="imgcontainer">
        <img src="./assets/logo.jpg" alt="Avatar" class="avatar" />
      </div>

      <div class="container">
        <label for="uname"><b>Usuário</b></label>
        <input
          type="text"
          placeholder="Usuario"
          v-model="username"
          name="uname"
          required
        />

        <label for="psw"><b>Senha</b></label>
        <input
          type="password"
          placeholder="Entre com a senha"
          v-model="password"
          name="psw"
          required
        />
        <div
          v-text="mensage.text"
          v-bind:class="mensage.class"
          v-show="mensage.text.length > 0"
        ></div>
        <button type="submit">Acessar</button>
      </div>

      <!-- <div class="container" style="background-color: #f1f1f1">
        <span class="psw">Esqueceu a  <a href="#">senha?</a></span>
      </div>-->
    </form>
  </div>
</template>

<script>
import webClient from "./client_axios";

export default {
  mounted() {
      webClient.get("imagem/paisagem/"+window.innerWidth+"/"+window.innerHeight).then(response => {
        if (response.data.image) {
            const img = new Image();
            img.src = response.data.image;
            img.onload = () => {
                document.querySelector(".container-form").style.backgroundImage = "url("+response.data.image+")";
            };

        }
      });

  },
  methods: {
    onSubmit() {
      console.log(this.usuario);
      if (this.username == "") {
        this.mensage.class = "danger";
        this.mensage.text = "Usuario não pode ficar em branco";
        return false;
      }
      if (this.password == "") {
        this.mensage.class = "danger";
        this.mensage.text = "Senha não pode ficar em branco";
        return false;
      }
      this.mensage.class = "info";
      this.mensage.text = "Fazendo login";
      try {
        webClient
          .post("login", { username: this.username, password: this.password })
          .then((res) => {
            let user = res.data;
            this.mensage.class = "success";
            this.mensage.text = "Usuario encontrado";
            localStorage.setItem("user", JSON.stringify(user));
            location.reload();
          })
          .catch((error) => {
            if (error.response.status == 403) {
              this.mensage.class = "error";
              this.mensage.text = "Usuário ou senha invalidos";
              this.password = "";
            } else {
              this.mensage.class = "error";
              this.mensage.text = "ocorreu um erro no servidor";
            }
            console.error(error);
          });
      } catch (err) {
        this.mensage.class = "error";
        this.mensage.text = "ocorreu um erro no servidor";
        console.error(err);
      }
    },
  },
  data() {
    return {
      username: "",
      password: "",
      cookie_token: true,
      mensage: {
        text: "",
        class: "info",
      },
    };
  },
  name: "Login",
};
</script>

<style>
.info,
.success,
.warning,
.error,
.validation {
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-repeat: no-repeat;
  background-position: 10px center;
}
.info {
  color: #00529b;
  background-color: #bde5f8;
}
.success {
  color: #4f8a10;
  background-color: #dff2bf;
}
.warning {
  color: #9f6000;
  background-color: #feefb3;
}
.error {
  color: #d8000c;
  background-color: #ffbaba;
}
/* background form */
.container-form {
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-image: url("./assets/bg.jpg");
  background-repeat: no-repeat;
}
/* Bordered form */
.form {
  border: 3px solid #f1f1f1;
  max-width: 350px;
  margin: 0 auto;
  margin-top: 85px;
  background-color: rgba(250, 250, 250, 0.3);
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
