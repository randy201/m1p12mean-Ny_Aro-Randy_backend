var express = require("express");
var planingController = require("../src/Controller/planing.controller");

var router = express.Router();

router.get("/", planingController.getAllPlanings);
router.post("/", planingController.addPlaning);

module.exports = router;
