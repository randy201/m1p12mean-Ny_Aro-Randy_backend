const serviceRep = require("../Repository/service.repository");

async function getAllServices(req, res, next) {
  try {
    const data = await serviceRep.getAllServices();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function saveService(req, res, next) {
  try {
    const data = await serviceRep.saveService(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllServices,
  saveService,
};
