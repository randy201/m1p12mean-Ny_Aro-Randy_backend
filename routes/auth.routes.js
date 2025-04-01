const express = require("express");
const router = express.Router();
const authController = require("../src/Controller/auth.controller");
const auth = require("../src/middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);


router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
