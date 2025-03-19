var express = require("express");
var rende_vousController = require("../src/Controller/rendez_vous.controller");

var router = express.Router();

router.get("/", rende_vousController.getAllRendez_vous);
router.get("/status/:status", rende_vousController.getAllRendez_vousByStatus);
router.post("/", rende_vousController.addRendez_vous);
router.put("/:id", rende_vousController.updateRendez_vous);

module.exports = router;
