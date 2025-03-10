const userModel = require("../Model/utilisateur.model");
const Utilisateur = require("../Model/utilisateur.model");

async function getAllUtilisateurs() {
  try {
    return await userModel.find().populate('roles', 'nom description');
  } catch (e) {
    console.error("Erreur lors de la réccupération des Utilisateurs", e);
    throw e;
  }
}

async function saveUtilisateur(user) {
  try {
    let userData = await userModel.findOne({ email: user.email });
    if(userData == null){
      userData = new Utilisateur();
    }
    userData.nom = user.nom;
    userData.prenom = user.prenom;
    userData.email = user.email;
    userData.pass = user.pass;
    userData.roles = user.roles || []; // Ajout des rôles
    return await userData.save();
  } catch (e) {
    console.error("Erreur lors de l'enregistrement :", e);
    throw e;
  }
}

async function addRoleToUser(userId, roleId) {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
      await user.save();
    }
    return await user.populate('roles', 'nom description');
  } catch (e) {
    console.error("Erreur lors de l'ajout du rôle :", e);
    throw e;
  }
}

async function removeRoleFromUser(userId, roleId) {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    user.roles = user.roles.filter(role => role.toString() !== roleId.toString());
    await user.save();
    return await user.populate('roles', 'nom description');
  } catch (e) {
    console.error("Erreur lors de la suppression du rôle :", e);
    throw e;
  }
}

async function findUserByID(userId) {
  try {
    return await userModel.findById(userId).populate('roles', 'nom description');
  } catch (e) {
    console.error("Erreur lors de la recherche de l'utilisateur :", e);
    throw e;
  }
}
module.exports = { 
  getAllUtilisateurs, 
  saveUtilisateur, 
  addRoleToUser, 
  removeRoleFromUser,
  findUserByID 
};
