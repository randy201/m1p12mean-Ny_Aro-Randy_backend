const serviceRep = require("../Repository/service.repository");

async function getAllServices(req, res, next) {
  try {
    const { page, search, limit = 10 } = req.query;
    if (page) {
      const data = await serviceRep.getAllServicesPaginate(page, limit, search);
      res.status(200).send(data);
    } else {
      const data = await serviceRep.getAllServices();
      res.status(200).send(data);
    }
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

async function getService(req, res, next) {
  try {
    const data = await serviceRep.getService(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function updateService(req, res, next) {
  try {
    const data = await serviceRep.updateService(req.params.id, req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function deleteService(req, res, next) {
  try {
    const data = await serviceRep.deleteService(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllServices,
  saveService,
  getService,
  updateService,
  deleteService,
};
