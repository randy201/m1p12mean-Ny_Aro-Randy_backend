var express = require("express");
var user = require("../src/Controller/utilisateur.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var express = require("express");
var user = require("../src/Controller/utilisateur.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", user.getAllUtilisateurs);
router.get("/:id", user.findUserByID);

// Seuls les managers peuvent ajouter des utilisateurs
//router.post("/", auth, checkRole('Manager'), user.ajoutUtilisateur);
router.post("/", user.ajoutUtilisateur);

// Routes pour la gestion des rôles
router.post("/roles/add", auth, checkRole("MANAGER"), user.addRole);
router.post("/roles/remove", auth, checkRole("MANAGER"), user.removeRole);

module.exports = router;
