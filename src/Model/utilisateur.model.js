const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
  /*telephone: {type: String,required: [true, "Le téléphone est requis"],},*/
  nom: { type: String, required: [true, "Le nom est requis"] },
  prenom: { type: String, required: [true, "Le prenom est requis"] },
  email: { type: String, required: [true, "Le email est requis"] },
  pass: { type: String, required: [true, "Le mot de passe est requis"] },
});

// Création du modèle
const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;
