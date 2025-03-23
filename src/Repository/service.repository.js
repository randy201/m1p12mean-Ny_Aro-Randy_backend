const serviceModel = require("../Model/service.model");
const Service = require("../Model/service.model");

async function getAllServices() {
  try {
    return await serviceModel.find();
  } catch (e) {
    console.error("Erreur lors de la réccupération des Services", e);
    throw e;
  }
}

async function getService(id) {
  try {
    return await serviceModel.findById(id);
  } catch (e) {
    console.error("Erreur lors de la réccupération des Services", e);
    throw e;
  }
}

async function saveService(service) {
  try {
    return await serviceModel.create(service);
  } catch (e) {
    console.error("Erreur lors de la création du Service", e);
    throw e;
  }
}

module.exports = { getAllServices, saveService, getService };
