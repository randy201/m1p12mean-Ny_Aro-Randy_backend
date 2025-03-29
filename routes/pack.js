var express = require("express");
var packController = require("../src/Controller/pack.controller");
var router = express.Router();
router.get("/", packController.getAllPacks);
router.get("/:id", packController.getPack);
router.post("/", packController.addPack);
router.put("/:id", packController.updatePack);
router.delete("/:id", packController.deletePack);

module.exports = router;
