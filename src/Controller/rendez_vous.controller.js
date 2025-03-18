const Rendez_vousRepository = require("../Repository/rendez_vous.repository");

async function getAllRendez_vous(req, res, next) {
  try {
    const data = await Rendez_vousRepository.getAllRendez_vous();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addRendez_vous(req, res, next) {
  try {
    const data = await Rendez_vousRepository.saveRendez_vous(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getAllRendez_vousByStatus(req, res, next) {
  try {
    const data = await Rendez_vousRepository.getAllRendez_vousByStatus(
      req.params.status
    );
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllRendez_vous,
  addRendez_vous,
  getAllRendez_vousByStatus,
};
