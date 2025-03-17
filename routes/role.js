var express = require("express");
var roleController = require("../src/Controller/role.controller");

var router = express.Router();

router.get("/", roleController.getAllRoles);
router.post("/", roleController.ajoutRole);
router.get("/:name", roleController.findByName);

module.exports = router;
