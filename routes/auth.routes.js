const express = require("express");
const router = express.Router();
const authController = require("../src/Controller/auth.controller");
const auth = require("../src/middleware/auth");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected route example
router.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
