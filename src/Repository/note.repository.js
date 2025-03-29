const noteModel = require("../Model/note.model");
const Note = require("../Model/note.model");

async function getAllNotes() {
  try {
    return await noteModel.find().populate("client");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Notes", e);
    throw e;
  }
}

async function getNote(id) {
  try {
    return await noteModel.findById(id).populate("client");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Notes", e);
    throw e;
  }
}

async function saveNote(note) {
  try {
    return await noteModel.create(note);
  } catch (e) {
    console.error("Erreur lors de la réccupération des Notes", e);
    throw e;
  }
}

module.exports = {
  getAllNotes,
  getNote,
  saveNote,
};
