const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceSchema = new mongoose.Schema({
  price: { type: Number, required: [true, "Le prix est requis"] },
  label: { type: String, required: [true, "Le nom est requis"] },
  description: { type: String },
  type: {
    status: Number,
    reduction: Number,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
