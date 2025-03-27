const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rendez_vousSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
  },
  info: {
    email: String,
    fullname: String,
    contact: String,
    message: String,
  },
  duree: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "donne"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Rendez_vous = mongoose.model("Rendez_vous", Rendez_vousSchema);

module.exports = Rendez_vous;
