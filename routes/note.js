var express = require("express");
var noteController = require("../src/Controller/note.controller");
const auth = require("../src/middleware/auth");
const checkRole = require("../src/middleware/checkRole");

var router = express.Router();

router.get("/", noteController.getAllNotes);
router.post("/", auth, noteController.saveNote);
router.get("/:id", noteController.getNote);

module.exports = router;
