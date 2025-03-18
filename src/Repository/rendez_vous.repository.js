const rendez_vousModel = require("../Model/rendez_vous.model");
const Rendez_vous = require("../Model/rendez_vous.model");

async function getAllRendez_vous() {
  try {
    return await rendez_vousModel.find();
  } catch (e) {
    console.error("Erreur lors de la réccupération des Rendez-vous", e);
    throw e;
  }
}

async function getAllRendez_vousByStatus(status) {
  try {
    return await rendez_vousModel.find({ status: status });
  } catch (e) {
    console.error("Erreur lors de la réccupération des Rendez-vous", e);
    throw e;
  }
}

async function saveRendez_vous(rendez_vous) {
  try {
    const rdv = new Rendez_vous();
    rdv.date = rendez_vous.date;
    rdv.manager = rendez_vous.manager;
    rdv.info = rendez_vous.info;
    rdv.duree = rendez_vous.duree;
    rdv.status = rendez_vous.status || "pending";
    return await rdv.save();
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du Rendez-vous", error);
    throw error;
  }
}

module.exports = {
  getAllRendez_vous,
  getAllRendez_vousByStatus,
  saveRendez_vous,
};
