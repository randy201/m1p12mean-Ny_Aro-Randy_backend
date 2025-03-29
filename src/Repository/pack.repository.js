const packModel = require("../Model/pack.model");
const Pack = require("../Model/pack.model");

async function getAllPacks() {
  try {
    return await packModel.find({ status: 0 }).populate("services");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Packs", e);
    throw e;
  }
}

async function getPack(id) {
  try {
    return await packModel.findById(id).populate("services");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Packs", e);
    throw e;
  }
}

async function savePack(pack) {
  try {
    return await packModel.create(pack);
  } catch (e) {
    console.error("Erreur lors de la réccupération des Packs", e);
    throw e;
  }
}

async function updatePack(id, pack) {
  try {
    return await packModel.findByIdAndUpdate(id, pack);
  } catch (e) {
    console.error("Erreur lors de la réccupération des Packs", e);
    throw e;
  }
}

async function deletePack(id) {
  try {
    const data = await packModel.findById(id);
    data.status = 1;
    data.updatedAt = new Date();
    return data.save();
  } catch (e) {
    console.error("Erreur lors de la réccupération des Packs", e);
    throw e;
  }
}

module.exports = {
  getAllPacks,
  getPack,
  savePack,
  updatePack,
  deletePack,
};
