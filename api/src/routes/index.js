var authenticateToken = require("../authenticateToken.js");
var express = require("express");

const PacienteController = require("../controllers/PacienteController");
const DentistaController = require("../controllers/DentistaController");
const {
    UserController,
    SchedulerController
}= require("../controllers");
const ProcedimentoController = require("../controllers/ProcedimentoController");
const ConvenioController = require("../controllers/ConvenioController");
const FilesController = require("../controllers/FilesController");

const GitHub = require ("../utils/GitHub")

var router = express.Router();

router.get("/", authenticateToken, (req, res, next) => {
    return res.json({ message: "OK" });
});

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/refreshtoken", authenticateToken, UserController.refreshtoken);

//pacientes
router.get("/pacientes/:page/:search", authenticateToken, PacienteController.index);
router.get("/pacientes/:page", authenticateToken, PacienteController.index);
router.get("/pacientes", authenticateToken, PacienteController.index);
router.get("/paciente/ficha", authenticateToken, PacienteController.ficha);
router.get("/paciente/:id", authenticateToken, PacienteController.find);
router.post("/pacientes", authenticateToken, PacienteController.store);
router.post("/pacientes/import", authenticateToken, PacienteController.import);

router.post("/paciente/:id", authenticateToken, PacienteController.store);

//dentistas
router.get(
    "/dentistas/:page/:search",
    authenticateToken,
    DentistaController.index
);
router.get(
    "/dentistas/:page",
    authenticateToken,
    DentistaController.index
);
router.get("/dentistas", authenticateToken, DentistaController.index);
router.get("/dentista/:id", authenticateToken, DentistaController.find);

router.post("/dentistas", authenticateToken, DentistaController.store);

router.post("/dentista/:id", authenticateToken, DentistaController.store);

//procedimentos
router.get(
    "/procedimentos/:page/:search",
    authenticateToken,
    ProcedimentoController.index
);

//procedimentos
router.get(
    "/procedimentos/:page",
    authenticateToken,
    ProcedimentoController.index
);

router.get("/procedimentos", authenticateToken, ProcedimentoController.index);

router.post("/procedimentos", authenticateToken, ProcedimentoController.store);

router.post(
    "/procedimento/:id",
    authenticateToken,
    ProcedimentoController.store
);


//convenio
router.get(
    "/convenios/:page/:search",
    authenticateToken,
    ConvenioController.index
);
router.get(
    "/convenios/:page",
    authenticateToken,
    ConvenioController.index
);

router.get("/convenios", authenticateToken, ConvenioController.index);

router.get("/convenio/:id", authenticateToken, ConvenioController.find);

router.post("/convenios", authenticateToken, ConvenioController.store);

router.post("/convenio/:id", authenticateToken, ConvenioController.store);


//consultas
router.get("/consultas/:data", authenticateToken, SchedulerController.index);
//create
router.post("/consulta", authenticateToken, SchedulerController.store);
//edit
router.post("/consulta/:id", authenticateToken, SchedulerController.store);

//cancel
router.get("/consultas/unschedule/:id", authenticateToken, SchedulerController.unschedule);

//uploads
router.post("/upload", authenticateToken, FilesController.upload);
router.get("/upload/:id", FilesController.find);

//github post issue
router.post("/report", GitHub.report);

module.exports = router;
