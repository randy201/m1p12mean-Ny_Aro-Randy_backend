const express = require("express");
const roleRep = require("../Repository/role.repository");

async function getAllRoles(req, res, next) {
  try {
    const data = await roleRep.getAllRoles();
    res.status(200).send(data);

    //return;
  } catch (e) {
    //throw e;
    console.error(e);

    res.status(500).send(e);
  }
}

async function ajoutRole(req, res, next) {
  try {
    const data = await roleRep.saveRole(req.body);
    res.status(200).send(data);
    //return;
  } catch (e) {
    console.error(e);

    res.status(500).send(e);
  }
}

module.exports = { getAllRoles, ajoutRole };
