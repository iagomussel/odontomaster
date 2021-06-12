<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col s1">
          <a class="waves-effect waves-light btn" :href="novo_url">Novo</a>
        </div>
        <div class="col s11">
          <input type="text" v-model="searchterm" placeholder="Pesquisar" />
        </div>
      </div>
      <table class="striped responsive-table">
        <thead>
          <tr>
            <th v-bind:key="{ key }" v-for="(header, col, key) in headers">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-bind:key="{ key }"
            v-for="(row, key) in dados.docs"
            class="context_menu_row"
            :id="row.id"
            v-on:dblclick="get_show_url(row.id)"
          >
            <td
              v-bind:key="{ key }"
              v-for="(header, key) in headers"
              v-html="filter_fields(header, row[header])"
            ></td>
          </tr>
        </tbody>
      </table>
      <div class="row" v-show="dados.pages>1">
        <div class="col s2 offset-s3">
          <div class="raised btn" @click="change_page(page - 1)">Anterior</div>
        </div>

        <div class="col s2 center-align valign-wrappe">
          <div class="chip h-100 center-align">
           {{ page }} de {{ dados.pages }}
          </div>
        </div>
        <div class="col s2 valign-wrapper">
          <div class="raised btn " @click="change_page(page + 1)">Proxima</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import webClient from "@/client_axios";

export default {
  mounted() {
    this.change_page(1);
  },
  props: {
    url: String,
    headers: Object,
    novo_url: String,
    ver_url: String,
    filter_fields: Function,
  },
  data() {
    return {
      page: 1,
      searchterm: "",
      dados: {
        docs: [],
        pages: 1,
        total: 10,
      },
    };
  },
  methods: {
    get_show_url(id) {
      document.location = this.ver_url.replace("__id__", id);
    },
    change_page(pageNum) {
      this.page = pageNum
      this.page = this.page < 1 ? 1 : this.page;
      this.page = this.page > this.dados.pages ? this.dados.pages : this.page;
      webClient
        .get(
          this.url +
            "/" +
            (this.page) +
            "/" +
            (this.searchterm == undefined ? "" : this.searchterm)
        )
        .then((res) => {
          this.dados = res.data;
        });
    },
  },
  watch: {
    searchterm: function() {
      this.change_page(1);
    },
  },
  components: {},
};
</script>
<style></style>
