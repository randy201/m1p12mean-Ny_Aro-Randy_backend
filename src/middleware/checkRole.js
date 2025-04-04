const Role = require("../Model/role.model");
const Utilisateur = require("../Model/utilisateur.model");

const checkRole = (roleName) => {
  return async (req, res, next) => {
    try {
      // Récupérer l'utilisateur avec ses rôles
      const user = await Utilisateur.findById(req.user._id).populate("roles");
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      var hasRole = false;
      user.roles.forEach((role) => {
        console.log(role.name + " <==> " + roleName);
        if (role.name === roleName) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({
          message: `Accès refusé. Le rôle ${roleName} est requis.`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = checkRole;
