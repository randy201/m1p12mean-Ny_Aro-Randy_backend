var express = require("express");
var emailController = require("../src/Controller/email.controller");
var router = express.Router();

router.post("/", emailController.sendEmail);

module.exports = router;
