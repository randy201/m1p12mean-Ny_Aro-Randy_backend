var express = require("express");
var user = require("../src/Controller/utilisateur.controller");

var router = express.Router();

router.get("/", user.getAllUtilisateurs);
router.post("/", user.ajoutUtilisateur);

module.exports = router;
