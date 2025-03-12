const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Le nom est requis"] },
  description: { type: String },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
