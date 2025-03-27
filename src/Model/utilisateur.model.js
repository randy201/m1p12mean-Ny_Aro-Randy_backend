const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

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

utilisateurSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("pass")) {
    user.pass = await bcrypt.hash(user.pass, 8);
  }
  next();
});

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

utilisateurSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.pass);
};

utilisateurSchema.methods.toJSON = function () {
  const user = this.toObject();
  //delete user.pass;
  return user;
};

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;
