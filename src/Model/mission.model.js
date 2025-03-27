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
      type: Schema.Types.ObjectId,
      ref: "Service",
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
