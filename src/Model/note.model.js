const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new mongoose.Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
  },
  createdAt: { type: Date, default: Date.now },
  note: { type: Number },
  description: { type: String },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
