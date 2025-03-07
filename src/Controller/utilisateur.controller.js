const express = require("express");
const utilisateurRep = require("../Repository/utilisateur.repository");

async function getAllUtilisateurs(req, res, next) {
  try {
    const data = await utilisateurRep.getAllUtilisateurs();
    res.status(200).send(data);

    //return;
  } catch (e) {
    //throw e;
    console.error(e);

    res.status(500).send(e);
  }
}

async function ajoutUtilisateur(req, res, next) {
  try {
    const data = await utilisateurRep.saveUtilisateur(req.body);
    res.status(200).send(data);
    //return;
  } catch (e) {
    console.error(e);

    res.status(500).send(e);
  }
}

module.exports = { getAllUtilisateurs, ajoutUtilisateur };
