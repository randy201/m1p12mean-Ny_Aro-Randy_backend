var express = require("express");
var noteController = require("../src/Controller/note.controller");

var router = express.Router();

router.get("/", noteController.getAllNotes);
router.post("/", noteController.saveNote);
router.get("/:id", noteController.getNote);

module.exports = router;
