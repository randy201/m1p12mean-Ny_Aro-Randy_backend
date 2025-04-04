const serviceModel = require("../Model/service.model");
const Service = require("../Model/service.model");

async function getAllServices() {
  try {
    return await serviceModel.find({ "type.status": 0 });
  } catch (e) {
    console.error("Erreur lors de la réccupération des Services", e);
    throw e;
  }
}

async function getAllServicesPaginate(page = 1, limit = 10, search = "") {
  try {
    const skip = (page - 1) * limit;
    const query = { "type.status": 0 };
    if (search) {
      query.$or = [
        { label: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const total = await serviceModel.countDocuments(query);
    const data = await serviceModel
      .find(query)
      .skip(skip)
      .limit(limit);
    return {
      data,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    };
  } catch (e) {
    console.error("Erreur lors de la réccupération des Services", e);
    throw e;
  }
}

async function getService(id) {
  try {
    return await serviceModel.findById(id);
  } catch (e) {
    console.error("Erreur lors de la réccupération des Services", e);
    throw e;
  }
}

async function saveService(service) {
  try {
    return await serviceModel.create(service);
  } catch (e) {
    console.error("Erreur lors de la création du Service", e);
    throw e;
  }
}

async function updateService(id, service) {
  try {
    return await serviceModel.findByIdAndUpdate(id, service);
  } catch (e) {
    console.error("Erreur lors de la mise à jour du Service", e);
    throw e;
  }
}

async function deleteService(id) {
  try {
    var data = await serviceModel.findById(id);
    data.type.status = 1;
    data.save();
    return data;
  } catch (e) {
    console.error("Erreur lors de la mise à jour du Service", e);
    throw e;
  }
}

module.exports = {
  getAllServices,
  getAllServicesPaginate,
  saveService,
  getService,
  updateService,
  deleteService,
};
