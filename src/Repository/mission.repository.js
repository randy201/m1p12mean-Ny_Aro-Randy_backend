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

async function getStatistiqueByYear(year) {
  try {
    const monthlyCounts = await missionModel.aggregate([
      {
        $match: {
          dateDebut: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year, 11, 31),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$dateDebut" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return monthlyCounts;
  } catch (e) {
    console.error("Erreur lors de la réccupération des Missions", e);
    throw e;
  }
}

module.exports = {
  getAllMissions,
  getMission,
  saveMission,
  getStatistiqueByYear,
};
