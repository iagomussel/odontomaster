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
      <input type="hidden" v-model="formulario.id" />
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h4 class="panel-title">Dados Básicos</h4>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col s9">
              <div class="row">
                <div class="col s2">
                  <label class="active" for="ficha">Ficha</label>
                  <input
                    v-model="formulario.ficha"
                    type="text"
                    id="ficha"
                    name="ficha"
                    class="form-control"
                    placeholder="000"
                  />
                </div>
                <div class="col s7">
                  <label class="active" for="nome">Nome</label>
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

                <div class="col s2">
                  <label class="active" for="sexo">Sexo</label>
                  <hi-select
                    name="sexo"
                    id="sexo"
                    v-model="formulario.sexo"
                    :options="['M', 'F']"
                  >
                  </hi-select>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <label class="active" for="data_nasc">Data de Nascimento</label>

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
                  <label class="active" for="email">Email</label>
                  <input
                    type="text"
                    v-model="formulario.email"
                    id="email"
                    name="email"
                    placeholder="exemplo@gmail.com"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <hi-field-list
                    v-model="formulario.professionals"
                    :fields="[
                      {
                        name: 'professional',
                        label: 'Nome',
                        type: 'hi-select-ajax',
                        url: 'dentistas',
                        TextField: 'nome',
                        exposed: true,
                      },
                    ]"
                    title="Dentistas"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <hi-field-list
                    v-model="formulario.plans"
                    title="Convenios"
                    :fields="[
                      {
                        type: 'hi-select-ajax',
                        name: 'agreement',
                        label: 'Convenio',
                        url: 'convenios',
                        TextField: 'nome',
                      },
                      {
                        type: 'text',
                        name: 'numero',
                        label: 'Numero',
                      },
                      {
                        type: 'hi-select',
                        label: 'Ativo',
                        name: 'ativo',
                        options: ['Sim', 'Não'],
                      },
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="col s3">
              <hi-image-picker v-model="formulario.imagem" />
            </div>
          </div>
          <!-- /.panel-body -->
        </div>

        <!-- /.panel -->

        <div
          class="panel panel-primary"
          v-for="(address, key) in formulario.addresses"
          v-bind:key="key"
        >
          <div class="panel-heading">
            <h4 class="panel-title">Endereço</h4>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col s2">
                <label class="active" for="cep">Cep</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  class="form-control cep"
                  placeholder="Cep"
                  v-on:keyup="getCep"
                  v-model="address.cep"
                />
              </div>

              <div class="col s6">
                <label class="active" for="rua">Rua</label>
                <input
                  v-model="address.logradouro"
                  type="text"
                  id="rua"
                  name="logradouro"
                  class="form-control"
                  placeholder="Rua"
                />
              </div>

              <div class="col s2">
                <label class="active" for="numero">Número</label>
                <input
                  v-model="address.numero"
                  type="text"
                  id="numero"
                  name="numero"
                  class="form-control"
                  placeholder="Número"
                />
              </div>

              <div class="col s2">
                <label class="active" for="complemento">Complemento</label>
                <input
                  v-model="address.complemento"
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
                <label class="active" for="bairro">Bairro</label>
                <input
                  v-model="address.bairro"
                  type="text"
                  id="bairro"
                  name="bairro"
                  class="form-control"
                  placeholder="Bairro"
                />
              </div>

              <div class="col s5">
                <label class="active" for="cidade">Cidade</label>
                <input
                  v-model="address.cidade"
                  type="text"
                  id="cidade"
                  name="cidade"
                  class="form-control"
                  placeholder="Cidade"
                />
              </div>

              <div class="col s2">
                <label class="active" for="uf">Estado</label>
                <hi-select
                  v-model="address.uf"
                  :options="[
                    'AC',
                    'AL',
                    'AM',
                    'AP',
                    'BA',
                    'CE',
                    'DF',
                    'ES',
                    'GO',
                    'MA',
                    'MG',
                    'MS',
                    'MT',
                    'PA',
                    'PB',
                    'PE',
                    'PI',
                    'PR',
                    'RJ',
                    'RN',
                    'RO',
                    'RR',
                    'RS',
                    'SC',
                    'SE',
                    'SP',
                    'TO',
                  ]"
                />
              </div>
            </div>
          </div>
          <!-- /.panel-body -->
        </div>
        <!-- /.panel -->

        <!-- FieldList Telefones-->
        <hi-field-list
          v-model="formulario.phones"
          title="Telefones"
          :fields="[
            {
              type: 'text',
              name: 'telefone',
              mask: '\'(##)#####-####\'',
              placeholder: '',
              label: 'Telefone',
            },
            {
              type: 'hi-select',
              name: 'tipo',
              label: 'Tipo',
              placeholder: 'Tipo',
              label: 'Tipo',
              options: ['Celular', 'Fixo', 'Trabalho'],
            },
            {
              type: 'text',
              name: 'contato',
              label: 'Contato',
            },
          ]"
        />

        <hi-field-list
          title="Observações sobre o paciente"
          v-model="formulario.obs"
          :fields="[
            {
              type: 'text',
              name: 'obs',
              mask: '',
              placeholder: '',
              label: 'Observações',
            },
          ]"
        />

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
import HiSelect from "../../components/Select.vue";
import HiImagePicker from "../../components/ImagePicker.vue";
import HiFieldList from "../../components/FieldList.vue";
export default {
  mounted() {
    //get dentistas
    let id = this.$route.params.id;
    if (id) {
      webClient
        .get("/paciente/" + id)
        .then((res) => {
          this.formulario = { ...this.formulario, ...res.data };
          this.formulario.professionals = this.formulario.professionals.map((p) => {
            return { professional: p };
          });
          if(this.formulario.addresses.lenght == 0){
            this.formulario.addresses.push({
            cep: "",
            logradouro: null,
            numero: null,
            complemento: null,
            bairro: null,
            cidade: null,
            uf: "RJ",
          });
          }
          this.formulario.addresses = this.formulario.addresses.map((a) => {
            a.cep = a.cep.replace(/\D/g, "");
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      webClient.get("/paciente/ficha").then((res) => {
        this.formulario.ficha = res.data;
      });
    }
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
      this.formulario.addresses.map((address) => {
        address.cep = address.cep.replace(/[^0-9]/g, "");
        let cep = address.cep.replace(/[^0-9]/g, "");
        if (cep.length >= 8) {
        axios.get("https://viacep.com.br/ws/" + cep + "/json").then((res) => {
          if (!res.data.error) {
            const { logradouro, bairro, localidade, uf, cep } = res.data;
            address = {
              ...address,
              logradouro,
              bairro,
              cidade: localidade,
              uf,
              cep,
            };
            document.querySelector("#numero").focus();
            return address
          }
        });
      } else {
        return address
      }
      });


    },
  },
  data() {
    return {
      formulario: {
        id: 0,
        ficha: null,
        nome: null,
        data_nasc: null,
        email: null,
        imagem: null,
        sexo: "M",
        professionals: [],
        plans: [],
        addresses: [
          {
            cep: "",
            logradouro: null,
            numero: null,
            complemento: null,
            bairro: null,
            cidade: null,
            uf: "RJ",
          },
        ],
        phones: [],
        obs: [],
      },
    };
  },
  name: "PacienteNovo",
  directives: { mask },
  components: {
    "hi-select": HiSelect,
    "hi-image-picker": HiImagePicker,
    "hi-field-list": HiFieldList,
  },
};
</script>
