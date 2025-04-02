var express = require("express");
var missionController = require("../src/Controller/mission.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", auth, missionController.getAllMissions);
router.post("/", auth, checkRole("MANAGER"), missionController.addMission);
router.get("/:id", auth, missionController.getMission);
router.get("/number/:year", auth, missionController.getStatistiqueByYear);
router.put("/:id", auth, missionController.updateMission);

module.exports = router;
