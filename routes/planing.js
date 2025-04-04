var express = require("express");
var planingController = require("../src/Controller/planing.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", auth, planingController.getAllPlanings);
router.get("/:id", auth, planingController.getPlaning);
router.post("/", auth, checkRole("MANAGER"), planingController.addPlaning);
router.put("/:id", auth, planingController.updatePlaning);

module.exports = router;
