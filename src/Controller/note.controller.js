const noteRep = require("../Repository/note.repository");

async function getAllNotes(req, res, next) {
  try {
    const data = await noteRep.getAllNotes();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getNote(req, res, next) {
  try {
    const data = await noteRep.getNote(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function saveNote(req, res, next) {
  try {
    const data = await noteRep.saveNote(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllNotes,
  getNote,
  saveNote,
};
