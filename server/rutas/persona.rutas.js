const express = require("express");

let api = express.Router(),
  personaControlador = require("../controladores/personaCRUD");

api.get("/persona", personaControlador.getData);
api.post("/persona", personaControlador.postData);
api.put("/persona/:id", personaControlador.putData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO
api.delete("/persona/:id", personaControlador.deleteData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO

api.post("/login", personaControlador.login);

module.exports = api;
