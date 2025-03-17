const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

//todo: envoyer la clé secrete dans le fichier .env avec le nom JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const utilisateurSchema = new Schema({
  lastname: { type: String, required: [true, "Le nom est requis"] },
  firstname: { type: String, required: [true, "Le prenom est requis"] },
  email: {
    type: String,
    required: [true, "Le email est requis"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: [true, "Le mot de passe est requis"],
    minlength: 6,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

// Hash password before saving
utilisateurSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("pass")) {
    user.pass = await bcrypt.hash(user.pass, 8);
  }
  next();
});

// Generate auth token
utilisateurSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
      roles: user.roles,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

// Compare password method
utilisateurSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.pass);
};

// Hide sensitive data when converting to JSON
utilisateurSchema.methods.toJSON = function () {
  const user = this.toObject();
  //delete user.pass;
  return user;
};

// Création du modèle
const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;
