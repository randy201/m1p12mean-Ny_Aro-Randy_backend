const missionRep = require("../Repository/mission.repository");

async function getAllMissions(req, res, next) {
  try {
    const data = await missionRep.getAllMissions();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getMission(req, res, next) {
  try {
    const data = await missionRep.getMission(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addMission(req, res, next) {
  try {
    const data = await missionRep.saveMission(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllMissions,
  getMission,
  addMission,
};
