var express = require("express");
var missionController = require("../src/Controller/mission.controller");

var router = express.Router();

router.get("/", missionController.getAllMissions);
router.post("/", missionController.addMission);
router.get("/:id", missionController.getMission);

module.exports = router;
