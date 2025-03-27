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

module.exports = {
  getAllPlanings,
  savePlaning,
};
