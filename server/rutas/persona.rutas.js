const express = require("express");

let api = express.Router(),
  personaControlador = require("../controladores/personaCRUD"),
  mail = require("../controladores/mailControlador");

api.get("/persona", personaControlador.getData);

api.post("/persona", personaControlador.postData);
api.post("/login", personaControlador.login);
// api.post("/send_mail", mail.mail1);

api.put("/persona/:id", personaControlador.putData);

api.delete("/persona/:id", personaControlador.deleteData);

module.exports = api;
