const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackSchema = new mongoose.Schema({
  label: { type: String },
  price: { type: Number, default: 0 },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Pack = mongoose.model("Pack", PackSchema);

module.exports = Pack;
