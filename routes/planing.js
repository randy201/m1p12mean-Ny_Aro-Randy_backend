var express = require("express");
var planingController = require("../src/Controller/planing.controller");

var router = express.Router();

router.get("/", planingController.getAllPlanings);
router.get("/:id", planingController.getPlaning);
router.post("/", planingController.addPlaning);
router.put("/:id", planingController.updatePlaning);

module.exports = router;
