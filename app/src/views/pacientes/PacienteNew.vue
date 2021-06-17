<template>
  <div>
    <form
      role="form"
      @submit.prevent="onSubmit"
      action="#"
      autocomplete="off"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4 class="panel-title">Dados Básicos</h4>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col s9">
              <div class="row">
                <div class="col s2">
                  <label for="ficha">Ficha</label>
                  <input
                    v-model="formulario.ficha"
                    type="text"
                    id="ficha"
                    name="ficha"
                    class="form-control"
                    placeholder="000"
                  />
                </div>
                <div class="col s10">
                  <label for="nome">Nome</label>
                  <input
                    type="text"
                    v-model="formulario.nome"
                    id="nome"
                    name="nome"
                    class="form-control"
                    placeholder="Nome Completo"
                    autofocus
                  />
                </div>
              </div>
              <div class="row">
                <div class="input-field col s4">
                  <label for="data_nasc">Data de Nascimento</label>

                  <input
                    name="data_nasc"
                    id="data_nasc"
                    type="text"
                    v-mask="'##/##/####'"
                    placeholder="00/00/0000"
                    v-model="formulario.data_nasc"
                  />
                </div>

                <div class="input-field col s6">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    v-model="formulario.email"
                    id="email"
                    name="email"
                    placeholder="exemplo@gmail.com"
                  />
                </div>
                <div class="input-field col s2">
                  <select name="sexo" id="sexo" v-model="formulario.sexo">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col s4">
                  <label for="convenio">Convênio</label>
                  <hi-select-ajax v-model="formulario.convenio_id" url="convenios" TextField="nome"  />
                </div>

                <div class="col s4">
                  <label for="codigoAssociado">N. Associado</label>
                  <input
                    type="text"
                    id="codigoAssociado"
                    v-model="formulario.n_associado"
                    name="codigoAssociado"
                    class="form-control"
                  />
                </div>
                <div class="col s4">
                  <label for="dentista">Dentista</label>
                  <hi-select-ajax v-model="formulario.dentista_id" url="dentistas" TextField="nome" />
                </div>
              </div>
            </div>
            <div class="col s3">
                <hi-image-picker v-model="formulario.imagem"/>
            </div>
          </div>
          <!-- /.panel-body -->
        </div>
        <!-- /.panel -->

        <div class="panel panel-primary">
          <div class="panel-heading">
            <h4 class="panel-title">Endereço</h4>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col s2">
                <label for="cep">Cep</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  class="form-control cep"
                  placeholder="Cep"
                  v-on:keyup="getCep"
                  v-model="formulario.endereco.cep"
                />
              </div>

              <div class="col s6">
                <label for="rua">Rua</label>
                <input
                  v-model="formulario.endereco.logradouro"
                  type="text"
                  id="rua"
                  name="logradouro"
                  class="form-control"
                  placeholder="Rua"
                />
              </div>

              <div class="col s2">
                <label for="numero">Número</label>
                <input
                  v-model="formulario.endereco.numero"
                  type="text"
                  id="numero"
                  name="numero"
                  class="form-control"
                  placeholder="Número"
                />
              </div>

              <div class="col s2">
                <label for="complemento">Complemento</label>
                <input
                  v-model="formulario.endereco.complemento"
                  type="text"
                  id="complemento"
                  name="complemento"
                  class="form-control"
                  placeholder="Complemento"
                />
              </div>
            </div>

            <div class="row">
              <div class="col s5">
                <label for="bairro">Bairro</label>
                <input
                  v-model="formulario.endereco.bairro"
                  type="text"
                  id="bairro"
                  name="bairro"
                  class="form-control"
                  placeholder="Bairro"
                />
              </div>

              <div class="col s5">
                <label for="cidade">Cidade</label>
                <input
                  v-model="formulario.endereco.localidade"
                  type="text"
                  id="cidade"
                  name="cidade"
                  class="form-control"
                  placeholder="Cidade"
                />
              </div>

              <div class="col s2">
                <label for="uf">Estado</label>
                 <!-- :value="formulario.endereco.uf"
                  v-on:input="formulario.endereco.uf=$event" -->
                <hi-select

                  v-model="formulario.endereco.uf"
                  :options='["AC",
"AL",
"AM",
"AP",
"BA",
"CE",
"DF",
"ES",
"GO",
"MA",
"MG",
"MS",
"MT",
"PA",
"PB",
"PE",
"PI",
"PR",
"RJ",
"RN",
"RO",
"RR",
"RS",
"SC",
"SE",
"SP",
"TO"]'
                />

              </div>
            </div>
          </div>
          <!-- /.panel-body -->
        </div>
        <!-- /.panel -->

        <div class="panel panel-primary">
          <div class="panel-heading">
            <h4 class="panel-title">
              Telefones
              <span
                class="btn btn-primary btn-teladd"
                @click="
                  () => {
                    formulario.telefones.push('');
                  }
                "
                >Adicionar</span
              >
            </h4>
          </div>
          <div class="panel-body">
            <table class="table table-borded table-hover table-sm">
              <thead>
                <tr>
                  <th>Telefone ex.:(21) 99999-9999</th>
                </tr>
              </thead>
              <tbody class="tel_area">
                <tr v-for="(telefone, ind) in formulario.telefones" v-bind:key="ind">
                  <td><input type="text" v-mask="'(##) #####-####'" v-model="formulario.telefones[ind]" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h4 class="panel-title">Descrição</h4>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col s12">
                <textarea
                  rows="10"
                  cols="40"
                  class="form-control"
                  name="obs"
                  id="obs"
                  v-model="formulario.obs"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <button type="reset" class="btn btn-default">Limpar</button>
      </div>
    </form>
  </div>
</template>

<script>
import webClient from "@/client_axios";
import { mask } from "vue-the-mask";
import axios from "axios";
import M from "materialize-css";
import HiSelectAjax from "../../components/SelectAjax.vue";
import HiSelect from "../../components/Select.vue";
import HiImagePicker from "../../components/ImagePicker.vue"
export default {
  created() {
    webClient.get("/paciente/ficha").then((res) => {
      console.log("ficha:" + res.data);
      this.formulario.ficha = res.data;
    });
    //get dentistas
    webClient.get("/dentistas").then((res) => {
      if (res.data.data.lenght > 0) this.dentistas = res.data.data;
      else this.dentistas = [{ nome: "nenhum dentista cadastrado" }];
      console.log(this.dentistas);
      M.AutoInit();
    });
  },
  methods: {
    onSubmit() {
      webClient.post("/pacientes", this.formulario).then((res) => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          this.$router.push("/pacientes");
        }
      });
    },
    getCep() {
      this.formulario.endereco.cep = this.formulario.endereco.cep.replace(/[^0-9]/g, "");
      let cep = this.formulario.endereco.cep.replace(/[^0-9]/g, "");
      console.log(cep);
      console.log(cep.length);
      if (cep.length >= 8) {
        axios.get("https://viacep.com.br/ws/" + cep + "/json").then((res) => {
          if (!res.data.error) {
            this.formulario.endereco = res.data;
            document.querySelector("#numero").focus();
          }
        });
      }
    },
  },
  data() {
    return {
      dentistas: [],
      convenios: [],
      formulario: {
        ficha: "",
        nome: "",
        data_nasc: "",
        email: "",
        imagem: "",
        sexo: "M",
        convenio_id: "",
        n_associado: "",
        dentista_id: "",
        endereco: {
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          uf:"RJ"
        },
        telefones: [""],
        obs: "",
      },
    };
  },
  name: "PacienteNovo",
  directives: { mask },
  components: {
    "hi-select-ajax": HiSelectAjax,
    "hi-select": HiSelect,
    "hi-image-picker": HiImagePicker,
  },
};
</script>
