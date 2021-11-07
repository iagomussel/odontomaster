<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col s2">
          <a class="waves-effect waves-light btn" :href="novo_url">Novo</a>
          <a class="waves-effect waves-default btn" @click="import_file">importar</a>
            <div class="progress_here"></div>
        </div>
        <div class="col s10">
          <input type="text" v-model="searchterm" placeholder="Pesquisar" />
        </div>
      </div>
      <table class="highlight responsive-table">
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
      <div class="row" v-show="dados.pages > 1">
        <div class="col s2 offset-s3">
          <div class="raised btn" @click="change_page(page - 1)">Anterior</div>
        </div>

        <div class="col s2 center-align valign-wrappe">
          <div class="chip h-100 center-align">{{ page }} de {{ dados.pages }}</div>
        </div>
        <div class="col s2 valign-wrapper">
          <div class="raised btn" @click="change_page(page + 1)">Proxima</div>
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
    import_url: String,
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
    import_file() {
      var input = document.createElement("input");

      input.type = "file";
      input.accept = "application/csv";

       // make progress bar
        var progress = document.createElement("progress");
        progress.max = 100;
        progress.value = 0;
        progress.style.width = "100%";
        progress.style.height = "10px";
        progress.style.margin = "0 auto";
        progress.style.display = "block";
        progress.style.marginTop = "10px";
        progress.style.marginBottom = "10px";
        progress.style.backgroundColor = "#eee";
        progress.style.borderRadius = "5px";
        progress.style.boxShadow = "0 0 5px #ccc";
        progress.style.position = "absolute";
        progress.style.top = "0";
        progress.style.left = "0";
        progress.style.zIndex = "1";

        // make progress bar text
        var progress_text = document.createElement("div");
        progress_text.style.width = "100%";
        progress_text.style.height = "10px";
        progress_text.style.margin = "0 auto";
        progress_text.style.display = "block";
        progress_text.style.marginTop = "10px";
        progress_text.style.marginBottom = "10px";
        progress_text.style.backgroundColor = "#eee";
        progress_text.style.borderRadius = "5px";
        progress_text.style.boxShadow = "0 0 5px #ccc";
        progress_text.style.position = "absolute";
        progress_text.style.top = "0";
        progress_text.style.left = "0";
        progress_text.style.zIndex = "1";
        progress_text.style.textAlign = "center";
        progress_text.style.fontSize = "12px";
        progress_text.style.color = "#666";
        progress_text.style.paddingTop = "5px";

        document.querySelector('.progress_here').appendChild(progress);
        document.querySelector('.progress_here').appendChild(progress_text);

      input.onchange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onprogress = (e) => {
          progress.value = e.loaded / e.total;
          progress_text.innerHTML = Math.round(e.loaded / e.total * 100) + "%";
        };

        reader.onload = (e) => {
          var data = e.target.result;
          webClient.post(this.import_url, data).then(() => {
            this.change_page(1);
          });
        };
        

        reader.readAsText(file);
      };
      input.click();
    },
    change_page(pageNum) {
      this.page = pageNum;
      this.page = this.page < 1 ? 1 : this.page;
      this.page = this.page > this.dados.pages ? this.dados.pages : this.page;
      webClient
        .get(
          this.url +
            "/" +
            this.page +
            "/" +
            (this.searchterm == undefined ? "" : this.searchterm)
        )
        .then((res) => {
          this.dados = res.data;
        });
    },
  },
  watch: {
    searchterm: function () {
      this.change_page(1);
    },
  },
  components: {},
};
</script>
