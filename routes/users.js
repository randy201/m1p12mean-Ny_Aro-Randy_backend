var express = require("express");
var user = require("../src/Controller/utilisateur.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", user.getAllUtilisateurs);
// Seuls les managers peuvent ajouter des utilisateurs
router.post("/", auth, checkRole('Manager'), user.ajoutUtilisateur);

// Routes pour la gestion des rôles
router.post("/roles/add", auth, checkRole('Manager'), user.addRole);
router.post("/roles/remove", auth, checkRole('Manager'), user.removeRole);

module.exports = router;
