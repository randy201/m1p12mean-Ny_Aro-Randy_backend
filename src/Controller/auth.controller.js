const Utilisateur = require("../Model/utilisateur.model");

exports.register = async (req, res) => {
  try {
    const { lastname, firstname, email, pass } = req.body;

    // Check if user already exists
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Create new user
    const user = new Utilisateur({
      lastname,
      firstname,
      email,
      pass,
    });

    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, pass, role } = req.body;

    // Find user
    const user = await Utilisateur.findOne({ email }).populate(
      "roles",
      "name description"
    );
    if (!user.roles.some((r) => r.name === role)) {
      return res.status(401).json({ message: "Accès non authorisés" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Check password
    const isMatch = await user.comparePassword(pass);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Generate token
    const token = user.generateAuthToken();

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
