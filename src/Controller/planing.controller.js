const PlaningRepository = require("../Repository/planing.repository");

async function getAllPlanings(req, res, next) {
  try {
    const data = await PlaningRepository.getAllPlanings();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addPlaning(req, res, next) {
  try {
    const data = await PlaningRepository.savePlaning(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getPlaning(req, res, next) {
  try {
    const data = await PlaningRepository.getPlaning(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllPlanings,
  addPlaning,
  getPlaning,
};
