const userModel = require("../Model/utilisateur.model");
const Utilisateur = require("../Model/utilisateur.model");

async function getAllUtilisateurs() {
  try {
    return await userModel.find();
  } catch (e) {
    console.error("Erreur lors de la réccupération des Utilisateurs", e);
    throw e;
  }
}

async function saveUtilisateur(user) {
  try {
    const userData = new Utilisateur();
    userData.nom = user.nom;
    userData.prenom = user.prenom;
    userData.email = user.email;
    userData.pass = user.pass;
    return await userData.save();
  } catch (e) {
    console.error("Erreur lors de l'enregistrement :", e);
    throw e;
  }
}

module.exports = { getAllUtilisateurs, saveUtilisateur };
