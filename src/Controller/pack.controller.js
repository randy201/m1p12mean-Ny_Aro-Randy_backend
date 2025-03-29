const PackRepository = require("../Repository/pack.repository");

async function getAllPacks(req, res, next) {
  try {
    const data = await PackRepository.getAllPacks();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getPack(req, res, next) {
  try {
    const data = await PackRepository.getPack(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addPack(req, res, next) {
  try {
    const data = await PackRepository.savePack(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function updatePack(req, res, next) {
  try {
    const data = await PackRepository.updatePack(req.params.id, req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function deletePack(req, res, next) {
  try {
    const data = await PackRepository.deletePack(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllPacks,
  getPack,
  addPack,
  updatePack,
  deletePack,
};
