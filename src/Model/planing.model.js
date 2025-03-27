const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaningSchema = new mongoose.Schema({
  dateDebut: { type: Date, required: true },
  duree: { type: Number, required: true },
  mecaniciens: [
    {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur",
    },
  ],
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  mission: {
    type: Schema.Types.ObjectId,
    ref: "Mission",
  },
});

const Planing = mongoose.model("Planing", PlaningSchema);

module.exports = Planing;
