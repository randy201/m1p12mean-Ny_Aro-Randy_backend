const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MissionSchema = new mongoose.Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
  },
  services: [
    {
      price: { type: Number },
      label: { type: String },
      description: { type: String },
      duree: { type: Number, default: 0 },
      status: {
        type: String,
        default: "pending",
        enum: ["pending", "in_progress", "done", "cancelled"],
      },
    },
  ],
  dateDebut: { type: Date, required: true },
  infoMission: {
    marque: String,
    model: String,
    serialNumber: String,
    description: String,
  },
});

const Mission = mongoose.model("Mission", MissionSchema);

module.exports = Mission;
