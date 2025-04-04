var express = require("express");
var user = require("../src/Controller/utilisateur.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", user.getAllUtilisateurs);
router.get("/:id", user.findUserByID);

//router.post("/", auth, checkRole('Manager'), user.ajoutUtilisateur);
router.post("/", user.ajoutUtilisateur);
// router.put("/:id/addRole", user.addRole);
router.put("/:id", user.updateUtilisateur);

router.post("/roles/add", auth, checkRole("MANAGER"), user.addRole);
router.post("/roles/remove", auth, checkRole("MANAGER"), user.removeRole);

module.exports = router;
