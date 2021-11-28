var authenticateToken = require("../authenticateToken");
var express = require("express");

const {
    PatientController,
    ProfessionalController,
    UserController,
    SchedulerController,
    GithubController,
    ProcedureController,
    FilesController,
    AgreementController,
    DashboardController

}= require("../controllers");


var router = express.Router();

router.get("/", authenticateToken, (req, res, next) => {
    return res.json({ message: "OK" });
});

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/refreshtoken", authenticateToken, UserController.refreshtoken);

//pacientes
router.get("/pacientes/:page/:search", authenticateToken, PatientController.index);
router.get("/pacientes/:page", authenticateToken, PatientController.index);
router.get("/pacientes", authenticateToken, PatientController.index);
router.get("/paciente/ficha", authenticateToken, PatientController.ficha);
router.get("/paciente/:id", authenticateToken, PatientController.find);
router.post("/pacientes", authenticateToken, PatientController.store);
router.post("/pacientes/import", authenticateToken, PatientController.import);
router.post("/paciente/:id", authenticateToken, PatientController.store);


//dentistas
router.get(
    "/dentistas/:page/:search",
    authenticateToken,
    ProfessionalController.index
);
router.get(
    "/dentistas/:page",
    authenticateToken,
    ProfessionalController.index
);
router.get("/dentistas", authenticateToken, ProfessionalController.index);
router.get("/dentista/:id", authenticateToken, ProfessionalController.find);

router.post("/dentistas", authenticateToken, ProfessionalController.store);

router.post("/dentista/:id", authenticateToken, ProfessionalController.store);

//procedimentos
router.get(
    "/procedimentos/:page/:search",
    authenticateToken,
    ProcedureController.index
);

//procedimentos
router.get(
    "/procedimentos/:page",
    authenticateToken,
    ProcedureController.index
);

router.get("/procedimentos", authenticateToken, ProcedureController.index);

router.post("/procedimentos", authenticateToken, ProcedureController.store);

router.post(
    "/procedimento/:id",
    authenticateToken,
    ProcedureController.store
);


//convenio
router.get(
    "/convenios/:page/:search",
    authenticateToken,
    AgreementController.index
);
router.get(
    "/convenios/:page",
    authenticateToken,
    AgreementController.index
);

router.get("/convenios", authenticateToken, AgreementController.index);

router.get("/convenio/:id", authenticateToken, AgreementController.find);

router.post("/convenios", authenticateToken, AgreementController.store);

router.post("/convenio/:id", authenticateToken, AgreementController.store);


//consultas
router.get("/consultas/:data", authenticateToken, SchedulerController.index);
//create
router.post("/consulta", authenticateToken, SchedulerController.store);
//edit
router.post("/consulta/:id", authenticateToken, SchedulerController.store);
//edit get
router.get("/consulta/:id", authenticateToken, SchedulerController.find);

//cancel
router.get("/consultas/unschedule/:id", authenticateToken, SchedulerController.unschedule);

//get horarios available for a professional [id = professional_id]
router.get("/consultas/horarios/:id/:date", authenticateToken, SchedulerController.availableTimes);
//get dates available for a professional [id = professional_id]
router.get("/consultas/datas/:id", authenticateToken, SchedulerController.availableDates);


//uploads
router.post("/upload", authenticateToken, FilesController.upload);
router.get("/upload/:id", FilesController.find);

//github post issue
router.post("/report", GithubController.report);

router.get("/dashboard", authenticateToken, DashboardController.index);

router.get("/test/:id/:date", SchedulerController.availableTimes)

module.exports = router;

router.get("/imagem/:term/:w/:h", FilesController.image);