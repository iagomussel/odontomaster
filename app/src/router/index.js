import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import PacienteList from "@/views/pacientes/PacienteList.vue";
import PacienteNew from "@/views/pacientes/PacienteNew.vue";
import DentistaList from "@/views/dentistas/DentistaList.vue";
import DentistaNew from "@/views/dentistas/DentistaNew.vue";
import ConveniosList from "@/views/convenios/ConvenioList.vue";
import ConveniosNew from "@/views/convenios/ConvenioNew.vue";
import ProcedimentoList from "@/views/procedimentos/ProcedimentoList.vue";
import ProcedimentoNew from "@/views/procedimentos/ProcedimentoNew.vue";

import Scheduler from "@/views/scheduler/Scheduler.vue";
import Sobre from "@/views/About.vue";


import SchedulerNew from "@/views/scheduler/SchedulerNew.vue";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Home,
      },  {
        path: "/pacientes",
        name: "Pacientes",
        component: PacienteList,
      },{
        path: "/paciente/:id",
        name: ".paciente_edit",
        component: PacienteNew,
      },  {
        path: "/pacientes/novo",
        name: ".paciente",
        component: PacienteNew,
    }, {
        path: "/dentistas",
        name: "Dentistas",
        component: DentistaList,
    }, {
        path: "/dentista/:id",
        name: ".dentistas_edit",
        component: DentistaNew,
    },  {
        path: "/dentistas/novo",
        name: ".dentistas",
        component: DentistaNew,
      },{
        path: "/convenios",
        name: "Convenios",
        component: ConveniosList,
      },  {
        path: "/convenios/novo",
        name: ".convenios",
        component: ConveniosNew,
    }, {
        path: "/convenio/:id",
        name: ".convenioEdit",
        component: ConveniosNew,
    },{
        path: "/procedimentos",
        name: "Procedimentos",
        component: ProcedimentoList,
    }, {
        path: "/procedimentos/novo",
        name: ".procedimentos",
        component: ProcedimentoNew,
    }, {
        path: "/procedimento/:id",
        name: ".procedimentosEdit",
        component: ProcedimentoNew,
    },{
        path: "/agenda",
        name: "Agenda",
        component: Scheduler,
      },  {
        path: "/agenda/novo",
        name: ".agendaNovo",
        component: SchedulerNew,
    },  {
        path: "/sobre",
        name: "Sobre",
        component: Sobre,
    },
];

const router = createRouter({
  history: createWebHistory(),
  mode: "history",
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes,
});

export default router;