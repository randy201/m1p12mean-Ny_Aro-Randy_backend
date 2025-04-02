var express = require("express");
var rende_vousController = require("../src/Controller/rendez_vous.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", auth, rende_vousController.getAllRendez_vous);
router.get(
  "/status/:status",
  auth,
  rende_vousController.getAllRendez_vousByStatus
);
router.post("/", rende_vousController.addRendez_vous);
router.put("/:id", auth, rende_vousController.updateRendez_vous);
router.get("/:id", auth, rende_vousController.getRendez_vous);

module.exports = router;
