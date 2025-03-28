const planingModel = require("../Model/planing.model");
const Planing = require("../Model/planing.model");

async function getAllPlanings() {
  try {
    return await planingModel.find();
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

module.exports = {
  getAllPlanings,
  savePlaning,
  getPlaning,
};
