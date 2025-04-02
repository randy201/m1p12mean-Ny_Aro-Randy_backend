var express = require("express");
var serviceController = require("../src/Controller/service.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getService);
router.post("/", auth, checkRole("MANAGER"), serviceController.saveService);
router.delete(
  "/:id",
  auth,
  checkRole("MANAGER"),
  serviceController.deleteService
);
router.put("/:id", auth, checkRole("MANAGER"), serviceController.updateService);
module.exports = router;
