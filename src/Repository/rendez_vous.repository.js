const rendez_vousModel = require("../Model/rendez_vous.model");
const Rendez_vous = require("../Model/rendez_vous.model");

async function getAllRendez_vousPaginate(
  search = "",
  page = 1,
  limit = 5,
  status = "pending"
) {
  try {
    const skip = (page - 1) * limit;
    let query = { status: status };

    if (search) {
      query = {
        $and: [
          {
            $or: [
              { "info.fullname": { $regex: search, $options: "i" } },
              { "info.email": { $regex: search, $options: "i" } },
            ],
          },
          { status: status },
        ],
      };
    }

    const total = await rendez_vousModel.countDocuments(query);
    const data = await rendez_vousModel
      .find(query)
      .populate("manager", "lastname firstname email roles")
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    return {
      data,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    };
  } catch (e) {
    console.error("Erreur lors de la réccupération des Rendez-vous", e);
    throw e;
  }
}

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
    return await rendez_vousModel
      .find({ status: status })
      .populate("manager", "lastname firstname email roles")
      .populate("manager.roles", "name description");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Rendez-vous", e);
    throw e;
  }
}

async function getRendez_vous(id) {
  try {
    return await rendez_vousModel
      .findById(id)
      .populate("manager", "lastname firstname email roles")
      .populate("manager.roles", "name description");
  } catch (e) {
    console.error("Erreur lors de la réccupération du Rendez-vous", e);
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

async function updateRendez_vous(id, rendez_vous) {
  try {
    const data = await rendez_vousModel
      .findById(id)
      .populate("manager", "lastname firstname email");
    data.info = rendez_vous.info;
    data.date = rendez_vous.date;
    data.manager = rendez_vous.manager;
    data.duree = rendez_vous.duree;
    data.status = rendez_vous.status;
    data.createdAt = data.createdAt;
    const rep = await data.save();

    return rep.populate("manager", "lastname firstname email");
  } catch (e) {
    console.error("Erreur lors de la mise à jour du Rendez-vous", e);
    throw e;
  }
}

module.exports = {
  getAllRendez_vous,
  getAllRendez_vousByStatus,
  saveRendez_vous,
  updateRendez_vous,
  getRendez_vous,
  getAllRendez_vousPaginate,
};
