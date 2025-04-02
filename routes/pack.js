var express = require("express");
var packController = require("../src/Controller/pack.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");
var router = express.Router();
router.get("/", packController.getAllPacks);
router.get("/:id", packController.getPack);
router.post("/", auth, checkRole("MANAGER"), packController.addPack);
router.put("/:id", auth, checkRole("MANAGER"), packController.updatePack);
router.delete("/:id", auth, checkRole("MANAGER"), packController.deletePack);

module.exports = router;
