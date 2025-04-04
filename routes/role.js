var express = require("express");
var roleController = require("../src/Controller/role.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", roleController.getAllRoles);
router.post("/", auth, checkRole("MANAGER"), roleController.ajoutRole);
router.get("/:name", roleController.findByName);

module.exports = router;
