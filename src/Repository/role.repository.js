const roleModel = require("../Model/role.model");
const Role = require("../Model/role.model");

async function getAllRoles() {
  try {
    return await roleModel.find();
  } catch (e) {
    console.error("Erreur lors de la réccupération des Roles", e);
    throw e;
  }
}

async function getRoleByName(name) {
  try {
    return await roleModel.findOne({ name: name.toUpperCase() });
  } catch (e) {
    console.error("Erreur lors de la réccupération des Roles", e);
    throw e;
  }
}

async function saveRole(role) {
  try {
    return await roleModel.create(role);
  } catch (e) {
    console.error("Erreur lors de l'enregistrement :", e);
    throw e;
  }
}

module.exports = { getAllRoles, saveRole, getRoleByName };
