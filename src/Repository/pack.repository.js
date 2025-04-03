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

async function getAllPacksPaginate(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit;
    const query = { status: 0 };
    if (search) {
      query.label = { $regex: search, $options: "i" };
    }
    const total = await packModel.countDocuments(query);
    const data = await packModel
      .find(query)
      .populate("services")
      .skip(skip)
      .limit(limit);
    return {
      data,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    };
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
    const data = await packModel.findById(id);
    data.label = pack.label;
    data.price = pack.price;
    data.remise = pack.remise;
    data.services = pack.services;
    data.updatedAt = new Date();
    return data.save();
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
  getAllPacksPaginate,
  getPack,
  savePack,
  updatePack,
  deletePack,
};
