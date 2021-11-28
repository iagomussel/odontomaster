import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component:  () => import("@/views/Dashboard.vue"),
      },  {
        path: "/pacientes",
        name: "Pacientes",
        component: () => import("@/views/pacientes/PacienteList.vue"),
      },{
        path: "/paciente/:id",
        name: ".paciente_edit",
        component: () => import("@/views/pacientes/PacienteNew.vue"),
      },  {
        path: "/pacientes/novo",
        name: ".paciente",
        component: () => import("@/views/pacientes/PacienteNew.vue"),
    }, {
        path: "/dentistas",
        name: "Dentistas",
        component: () => import("@/views/dentistas/DentistaList.vue"),
    }, {
        path: "/dentista/:id",
        name: ".dentistas_edit",
        component: () => import("@/views/dentistas/DentistaNew.vue"),
    },  {
        path: "/dentistas/novo",
        name: ".dentistas",
        component: () => import("@/views/dentistas/DentistaNew.vue"),
      },{
        path: "/convenios",
        name: "Convenios",
        component: () => import("@/views/convenios/ConvenioList.vue"),
      },  {
        path: "/convenios/novo",
        name: ".convenios",
        component: () => import("@/views/convenios/ConvenioNew.vue"),
    }, {
        path: "/convenio/:id",
        name: ".convenioEdit",
        component: () => import("@/views/convenios/ConvenioNew.vue"),
    },{
        path: "/procedimentos",
        name: "Procedimentos",
        component: () => import("@/views/procedimentos/ProcedimentoList.vue"),
    }, {
        path: "/procedimentos/novo",
        name: ".procedimentos",
        component: () => import("@/views/procedimentos/ProcedimentoNew.vue"),
    }, {
        path: "/procedimento/:id",
        name: ".procedimentosEdit",
        component: () => import("@/views/procedimentos/ProcedimentoNew.vue"),
    },{
        path: "/agenda",
        name: "Agenda",
        component: () => import("@/views/scheduler/Scheduler.vue"),
      },  {
        path: "/agenda/novo",
        name: ".agendaNovo",
        component: () => import("@/views/scheduler/SchedulerNew.vue"),
    },  {
        path: "/sobre",
        name: "Sobre",
        component: () => import("@/views/About.vue"),
    },
    {
        path: '/report',
        name: '.Report',
        component: () => import('@/views/reportBug.vue'),
    },{
        path: '/reportTanks',
        name: '.ReportTanks',
        component: () => import('@/views/reportTanks.vue'),
    },{
        path: '/configurations',
        name: '.Configurations',
        component: () => import('@/views/Configurations.vue'),
    }

];

const router = createRouter({
  history: createWebHistory(),
  mode: "history",
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes,
});

export default router;