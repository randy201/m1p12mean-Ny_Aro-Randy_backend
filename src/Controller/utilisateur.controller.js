// const express = require("express");
const utilisateurRep = require("../Repository/utilisateur.repository");

async function getAllUtilisateurs(req, res, next) {
  try {
    const type = req.query.role || null;
    console.log(`le type est ${type}`);

    if (
      type !== "null" &&
      type !== "undefined" &&
      type !== "" &&
      type !== null
    ) {
      const data = await utilisateurRep.getAllByRoleName(type);
      res.status(200).send(data);
    } else {
      const data = await utilisateurRep.getAllUtilisateurs();
      res.status(200).send(data);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function ajoutUtilisateur(req, res, next) {
  try {
    const data = await utilisateurRep.saveUtilisateur(req.body);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addRole(req, res, next) {
  try {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      return res.status(400).send({ message: "userId et roleId sont requis" });
    }
    const user = await utilisateurRep.addRoleToUser(userId, roleId);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
}

async function removeRole(req, res, next) {
  try {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      return res.status(400).send({ message: "userId et roleId sont requis" });
    }
    const user = await utilisateurRep.removeRoleFromUser(userId, roleId);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
}

async function findUserByID(req, res, next) {
  try {
    const data = await utilisateurRep.findUserByID(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function updateUtilisateur(req, res, next) {
  console.log(req.body.roles);
  try {
    const { _id, lastname, firstname, email, pass, roles } = req.body;
    if (!_id || !lastname || !firstname || !email || !pass || !roles) {
      return res.status(400).send({ message: "Tous les champs sont requis" });
    }
    const user = await utilisateurRep.updateUtilisateur(req.body);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
}

module.exports = {
  getAllUtilisateurs,
  ajoutUtilisateur,
  addRole,
  removeRole,
  findUserByID,
  updateUtilisateur,
};
