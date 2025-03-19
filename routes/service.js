var express = require("express");
var serviceController = require("../src/Controller/service.controller");

var router = express.Router();
router.get("/", serviceController.getAllServices);
router.post("/", serviceController.saveService);
module.exports = router;
