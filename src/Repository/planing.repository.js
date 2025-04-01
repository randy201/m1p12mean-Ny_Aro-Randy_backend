const planingModel = require("../Model/planing.model");
const Planing = require("../Model/planing.model");

async function getAllPlanings() {
  try {
    return await planingModel
      .find()
      .populate("mecaniciens", "lastname firstname email")
      .populate("services")
      .populate("mission");
  } catch (e) {
    console.error("Erreur lors de la réccupération des planings", e);
    throw e;
  }
}

async function savePlaning(planing) {
  try {
    return await planingModel.create(planing);
  } catch (e) {
    console.error("Erreur lors de la création d'un planing", e);
    throw e;
  }
}

async function getPlaning(id) {
  try {
    return await planingModel
      .findById(id)
      .populate("mecaniciens")
      .populate("services")
      .populate("mission");
  } catch (e) {
    console.error("Erreur lors de la récupération d'un planing", e);
    throw e;
  }
}

async function updatePlaning(id, planing) {
  try {
    return await planingModel
      .findByIdAndUpdate(id, planing, { new: true })
      .populate("mecaniciens")
      .populate("services")
      .populate("mission");
  } catch (e) {
    console.error("Erreur lors de la mise à jour d'un planing", e);
    throw e;
  }
}

module.exports = {
  getAllPlanings,
  savePlaning,
  getPlaning,
  updatePlaning,
};
