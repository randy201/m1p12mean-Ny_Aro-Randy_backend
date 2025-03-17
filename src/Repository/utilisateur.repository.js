const userModel = require("../Model/utilisateur.model");
const Utilisateur = require("../Model/utilisateur.model");
const userRepository = require("../Repository/role.repository");

async function getAllUtilisateurs() {
  try {
    return await userModel.find().populate("roles", "name description");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Utilisateurs", e);
    throw e;
  }
}

async function getAllByRoleName(roleName) {
  roleName = roleName.replace("mechanic", "mecanic");
  try {
    const role = await userRepository.getRoleByName(roleName.toUpperCase());
    if (!role) {
      throw new Error("role_not_found");
    }
    return await userModel
      .find({ roles: role })
      .populate("roles", "name description");
  } catch (e) {
    console.error("Erreur lors de la réccupération des Utilisateurs", e);
    throw e;
  }
}

async function saveUtilisateur(user) {
  try {
    let userData = await userModel.findOne({ email: user.email });
    if (userData == null) {
      userData = new Utilisateur();
    }
    if (!user.roles || user.roles.length === 0) {
      throw new Error("role_required");
    }
    const list_role = await Promise.all(
      user.roles.map(async (role) => {
        if (role) {
          const roleData = await userRepository.getRoleByName(
            role.toUpperCase()
          );
          return roleData?._id.toString();
        }
        return null;
      })
    );
    const validRoles = list_role.filter((role) => role !== null);

    if (validRoles.length === 0) {
      throw new Error("Aucun rôle valide fourni");
    }
    userData.lastname = user.lastname;
    userData.firstname = user.firstname;
    userData.email = user.email;
    userData.pass = user.pass;
    userData.roles = validRoles;
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
      throw new Error("Utilisateur non trouvé");
    }

    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
      await user.save();
    }
    return await user.populate("roles", "name description");
  } catch (e) {
    console.error("Erreur lors de l'ajout du rôle :", e);
    throw e;
  }
}

async function removeRoleFromUser(userId, roleId) {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    user.roles = user.roles.filter(
      (role) => role.toString() !== roleId.toString()
    );
    await user.save();
    return await user.populate("roles", "name description");
  } catch (e) {
    console.error("Erreur lors de la suppression du rôle :", e);
    throw e;
  }
}

async function findUserByID(userId) {
  try {
    const data = await userModel.findById(userId);
    if (!data) {
      throw new Error("Utilisateur non trouvé");
    }
    return await data.populate("roles", "name description");
  } catch (e) {
    console.error("Erreur lors de la recherche de l'utilisateur :", e);
    throw e;
  }
}

async function updateUtilisateur(user) {
  try {
    const userData = await userModel.findById(user._id);
    if (!userData) {
      throw new Error("Utilisateur non trouvé");
    }
    userData.lastname = user.lastname;
    userData.firstname = user.firstname;
    userData.email = user.email;
    //userData.pass = user.pass;
    if (userData.pass === user.pass) {
    } else {
      userData.pass = await bcrypt.hash(user.pass, 8);
    }
    userData.roles = user.roles;
    return await userData.save();
  } catch (e) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", e);
    throw e;
  }
}

module.exports = {
  getAllUtilisateurs,
  saveUtilisateur,
  addRoleToUser,
  removeRoleFromUser,
  findUserByID,
  getAllByRoleName,
  updateUtilisateur,
};
