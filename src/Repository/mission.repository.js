const missionModel = require("../Model/mission.model");
const Mission = require("../Model/mission.model");

async function getAllMissions() {
  try {
    return await missionModel.find().populate("client").populate("manager");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Missions", e);
    throw e;
  }
}

async function getMission(id) {
  try {
    return await missionModel
      .findById(id)
      .populate("client")
      .populate("manager");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Missions", e);
    throw e;
  }
}

async function saveMission(mission) {
  try {
    return await missionModel.create(mission);
  } catch (e) {
    console.error("Erreur lors de la création d'une Mission", e);
    throw e;
  }
}

module.exports = {
  getAllMissions,
  getMission,
  saveMission,
};
