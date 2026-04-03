<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h4 class="panel-title">
        Odontograma
        <button class="btn btn-small right" @click="toggleEdit">
          {{ editing ? 'Fechar Edicao' : 'Editar' }}
        </button>
      </h4>
    </div>
    <div class="panel-body">
      <!-- Legend -->
      <div class="row" style="margin-bottom: 12px;">
        <div class="col s12">
          <span
            v-for="cond in condicoes"
            :key="cond.value"
            style="margin-right: 12px; display: inline-flex; align-items: center; font-size: 12px;"
          >
            <span
              :style="{ background: cond.color, width: '14px', height: '14px', display: 'inline-block', borderRadius: '2px', marginRight: '4px', border: '1px solid #999' }"
            ></span>
            {{ cond.label }}
          </span>
        </div>
      </div>

      <!-- Upper teeth (11-18, 21-28) -->
      <div class="odontograma-arcade" style="text-align: center; margin-bottom: 8px;">
        <span class="grey-text" style="font-size: 11px;">Superior Direito</span>
        <div style="display: inline-flex; gap: 2px; margin: 0 8px;">
          <div
            v-for="num in upperRight"
            :key="num"
            class="tooth-cell"
            :class="{ selected: selectedTooth === num }"
            @click="selectTooth(num)"
          >
            <svg width="32" height="40" viewBox="0 0 32 40">
              <rect x="1" y="1" width="30" height="38" rx="4"
                :fill="getToothColor(num)" stroke="#666" stroke-width="1" />
              <!-- Faces -->
              <line x1="8" y1="8" x2="24" y2="8" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="32" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="8" x2="8" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="24" y1="8" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <!-- Face fills -->
              <polygon :points="'1,1 8,8 8,32 1,39'" :fill="getFaceColor(num, 'D')" opacity="0.6" />
              <polygon :points="'31,1 24,8 24,32 31,39'" :fill="getFaceColor(num, 'M')" opacity="0.6" />
              <polygon :points="'1,1 8,8 24,8 31,1'" :fill="getFaceColor(num, 'V')" opacity="0.6" />
              <polygon :points="'1,39 8,32 24,32 31,39'" :fill="getFaceColor(num, 'L')" opacity="0.6" />
              <rect x="8" y="8" width="16" height="24" :fill="getFaceColor(num, 'O')" opacity="0.6" />
              <!-- X for absent -->
              <template v-if="getToothCondition(num) === 'ausente'">
                <line x1="4" y1="4" x2="28" y2="36" stroke="#c00" stroke-width="2" />
                <line x1="28" y1="4" x2="4" y2="36" stroke="#c00" stroke-width="2" />
              </template>
            </svg>
            <div style="font-size: 10px; text-align: center;">{{ num }}</div>
          </div>
        </div>
        <span class="grey-text" style="font-size: 11px;">Superior Esquerdo</span>
        <div style="display: inline-flex; gap: 2px; margin: 0 8px;">
          <div
            v-for="num in upperLeft"
            :key="num"
            class="tooth-cell"
            :class="{ selected: selectedTooth === num }"
            @click="selectTooth(num)"
          >
            <svg width="32" height="40" viewBox="0 0 32 40">
              <rect x="1" y="1" width="30" height="38" rx="4"
                :fill="getToothColor(num)" stroke="#666" stroke-width="1" />
              <line x1="8" y1="8" x2="24" y2="8" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="32" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="8" x2="8" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="24" y1="8" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <polygon :points="'1,1 8,8 8,32 1,39'" :fill="getFaceColor(num, 'M')" opacity="0.6" />
              <polygon :points="'31,1 24,8 24,32 31,39'" :fill="getFaceColor(num, 'D')" opacity="0.6" />
              <polygon :points="'1,1 8,8 24,8 31,1'" :fill="getFaceColor(num, 'V')" opacity="0.6" />
              <polygon :points="'1,39 8,32 24,32 31,39'" :fill="getFaceColor(num, 'L')" opacity="0.6" />
              <rect x="8" y="8" width="16" height="24" :fill="getFaceColor(num, 'O')" opacity="0.6" />
              <template v-if="getToothCondition(num) === 'ausente'">
                <line x1="4" y1="4" x2="28" y2="36" stroke="#c00" stroke-width="2" />
                <line x1="28" y1="4" x2="4" y2="36" stroke="#c00" stroke-width="2" />
              </template>
            </svg>
            <div style="font-size: 10px; text-align: center;">{{ num }}</div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr style="margin: 4px 0; border-color: #ccc;" />

      <!-- Lower teeth (41-48, 31-38) -->
      <div class="odontograma-arcade" style="text-align: center; margin-top: 8px;">
        <span class="grey-text" style="font-size: 11px;">Inferior Direito</span>
        <div style="display: inline-flex; gap: 2px; margin: 0 8px;">
          <div
            v-for="num in lowerRight"
            :key="num"
            class="tooth-cell"
            :class="{ selected: selectedTooth === num }"
            @click="selectTooth(num)"
          >
            <div style="font-size: 10px; text-align: center;">{{ num }}</div>
            <svg width="32" height="40" viewBox="0 0 32 40">
              <rect x="1" y="1" width="30" height="38" rx="4"
                :fill="getToothColor(num)" stroke="#666" stroke-width="1" />
              <line x1="8" y1="8" x2="24" y2="8" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="32" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="8" x2="8" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="24" y1="8" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <polygon :points="'1,1 8,8 8,32 1,39'" :fill="getFaceColor(num, 'D')" opacity="0.6" />
              <polygon :points="'31,1 24,8 24,32 31,39'" :fill="getFaceColor(num, 'M')" opacity="0.6" />
              <polygon :points="'1,1 8,8 24,8 31,1'" :fill="getFaceColor(num, 'L')" opacity="0.6" />
              <polygon :points="'1,39 8,32 24,32 31,39'" :fill="getFaceColor(num, 'V')" opacity="0.6" />
              <rect x="8" y="8" width="16" height="24" :fill="getFaceColor(num, 'O')" opacity="0.6" />
              <template v-if="getToothCondition(num) === 'ausente'">
                <line x1="4" y1="4" x2="28" y2="36" stroke="#c00" stroke-width="2" />
                <line x1="28" y1="4" x2="4" y2="36" stroke="#c00" stroke-width="2" />
              </template>
            </svg>
          </div>
        </div>
        <span class="grey-text" style="font-size: 11px;">Inferior Esquerdo</span>
        <div style="display: inline-flex; gap: 2px; margin: 0 8px;">
          <div
            v-for="num in lowerLeft"
            :key="num"
            class="tooth-cell"
            :class="{ selected: selectedTooth === num }"
            @click="selectTooth(num)"
          >
            <div style="font-size: 10px; text-align: center;">{{ num }}</div>
            <svg width="32" height="40" viewBox="0 0 32 40">
              <rect x="1" y="1" width="30" height="38" rx="4"
                :fill="getToothColor(num)" stroke="#666" stroke-width="1" />
              <line x1="8" y1="8" x2="24" y2="8" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="32" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="8" y1="8" x2="8" y2="32" stroke="#aaa" stroke-width="0.5" />
              <line x1="24" y1="8" x2="24" y2="32" stroke="#aaa" stroke-width="0.5" />
              <polygon :points="'1,1 8,8 8,32 1,39'" :fill="getFaceColor(num, 'M')" opacity="0.6" />
              <polygon :points="'31,1 24,8 24,32 31,39'" :fill="getFaceColor(num, 'D')" opacity="0.6" />
              <polygon :points="'1,1 8,8 24,8 31,1'" :fill="getFaceColor(num, 'L')" opacity="0.6" />
              <polygon :points="'1,39 8,32 24,32 31,39'" :fill="getFaceColor(num, 'V')" opacity="0.6" />
              <rect x="8" y="8" width="16" height="24" :fill="getFaceColor(num, 'O')" opacity="0.6" />
              <template v-if="getToothCondition(num) === 'ausente'">
                <line x1="4" y1="4" x2="28" y2="36" stroke="#c00" stroke-width="2" />
                <line x1="28" y1="4" x2="4" y2="36" stroke="#c00" stroke-width="2" />
              </template>
            </svg>
          </div>
        </div>
      </div>

      <!-- Edit panel -->
      <div v-if="editing && selectedTooth" class="card-panel" style="margin-top: 16px;">
        <h6><b>Dente {{ selectedTooth }}</b></h6>
        <div class="row">
          <div class="col s4">
            <label class="active">Condicao Geral</label>
            <select v-model="editForm.condicao" class="browser-default">
              <option v-for="c in condicoes" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
          </div>
          <div class="col s4">
            <label class="active">Face (opcional)</label>
            <select v-model="editForm.face" class="browser-default">
              <option value="">Todas / Geral</option>
              <option value="V">Vestibular (V)</option>
              <option value="L">Lingual/Palatina (L)</option>
              <option value="M">Mesial (M)</option>
              <option value="D">Distal (D)</option>
              <option value="O">Oclusal/Incisal (O)</option>
            </select>
          </div>
          <div class="col s4">
            <label class="active">Procedimento</label>
            <hi-select-ajax
              v-model="editForm.procedure"
              url="procedimentos"
              textField="nome"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <label class="active">Observacao</label>
            <textarea
              v-model="editForm.observacao"
              class="materialize-textarea"
              placeholder="Observacao sobre o dente..."
            ></textarea>
          </div>
        </div>
        <button class="btn" @click="saveToothEntry" :disabled="!editForm.condicao">
          Salvar
        </button>
        <button class="btn-flat" @click="selectedTooth = null">Cancelar</button>
      </div>

      <!-- Selected tooth history -->
      <div v-if="selectedTooth && !editing" class="card-panel" style="margin-top: 16px;">
        <h6><b>Dente {{ selectedTooth }} - Historico</b></h6>
        <table class="striped" v-if="toothHistory.length > 0">
          <thead>
            <tr>
              <th>Data</th>
              <th>Face</th>
              <th>Condicao</th>
              <th>Dentista</th>
              <th>Observacao</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reg in toothHistory" :key="reg.id">
              <td>{{ reg.data_registro }}</td>
              <td>{{ reg.face || 'Geral' }}</td>
              <td>
                <span
                  class="badge"
                  :style="{ background: getConditionColor(reg.condicao), padding: '4px 8px', borderRadius: '4px', color: 'white' }"
                >
                  {{ getConditionLabel(reg.condicao) }}
                </span>
              </td>
              <td>{{ reg.professional ? reg.professional.nome : '-' }}</td>
              <td>{{ reg.observacao || '-' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="grey-text">Nenhum registro para este dente.</p>
      </div>
    </div>
  </div>
</template>

<script>
import webClient from "@/client_axios";
import HiSelectAjax from "@/components/SelectAjax.vue";

const CONDICOES = [
  { value: "higido", label: "Higido", color: "#e0e0e0" },
  { value: "cariado", label: "Cariado", color: "#e53935" },
  { value: "restaurado", label: "Restaurado", color: "#1e88e5" },
  { value: "ausente", label: "Ausente", color: "#9e9e9e" },
  { value: "fraturado", label: "Fraturado", color: "#ff9800" },
  { value: "implante", label: "Implante", color: "#8e24aa" },
  { value: "endodontia", label: "Endodontia", color: "#43a047" },
  { value: "protese", label: "Protese", color: "#00897b" },
  { value: "selante", label: "Selante", color: "#fdd835" },
  { value: "em_tratamento", label: "Em Tratamento", color: "#fb8c00" },
];

export default {
  name: "OdontogramaChart",
  components: {
    "hi-select-ajax": HiSelectAjax,
  },
  props: {
    patientId: { type: [String, Number], required: true },
  },
  data() {
    return {
      registros: [],
      selectedTooth: null,
      toothHistory: [],
      editing: false,
      condicoes: CONDICOES,
      editForm: {
        condicao: "higido",
        face: "",
        observacao: "",
        procedure: null,
      },
      // FDI notation
      upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
      upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
      lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
      lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      webClient.get("/odontograma/" + this.patientId + "/atual").then((res) => {
        this.registros = res.data;
      });
    },
    selectTooth(num) {
      this.selectedTooth = num;
      this.editForm = { condicao: "higido", face: "", observacao: "", procedure: null };

      // Load history for selected tooth
      webClient
        .get("/odontograma/" + this.patientId + "/dente/" + num)
        .then((res) => {
          this.toothHistory = res.data;
        });

      // Pre-fill with current condition
      const current = this.registros.find(
        (r) => r.dente === num && (!r.face || r.face === "")
      );
      if (current) {
        this.editForm.condicao = current.condicao;
      }
    },
    toggleEdit() {
      this.editing = !this.editing;
      if (!this.editing) {
        this.selectedTooth = null;
      }
    },
    getToothCondition(num) {
      const reg = this.registros.find(
        (r) => r.dente === num && (!r.face || r.face === "" || r.face === "geral")
      );
      return reg ? reg.condicao : "higido";
    },
    getToothColor(num) {
      const condicao = this.getToothCondition(num);
      if (condicao === "ausente") return "#f5f5f5";
      return "#fff";
    },
    getFaceColor(num, face) {
      const reg = this.registros.find((r) => r.dente === num && r.face === face);
      if (reg) {
        return this.getConditionColor(reg.condicao);
      }
      return "transparent";
    },
    getConditionColor(condicao) {
      const found = CONDICOES.find((c) => c.value === condicao);
      return found ? found.color : "#e0e0e0";
    },
    getConditionLabel(condicao) {
      const found = CONDICOES.find((c) => c.value === condicao);
      return found ? found.label : condicao;
    },
    saveToothEntry() {
      const data = {
        dente: this.selectedTooth,
        condicao: this.editForm.condicao,
        face: this.editForm.face || null,
        observacao: this.editForm.observacao || null,
        procedure_id: this.editForm.procedure ? this.editForm.procedure.id : null,
      };
      webClient
        .post("/odontograma/" + this.patientId, data)
        .then(() => {
          this.load();
          this.selectTooth(this.selectedTooth);
        });
    },
  },
};
</script>

<style scoped>
.tooth-cell {
  cursor: pointer;
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s;
}
.tooth-cell:hover {
  border-color: #2196f3;
}
.tooth-cell.selected {
  border-color: #1565c0;
  background: #e3f2fd;
}
</style>
