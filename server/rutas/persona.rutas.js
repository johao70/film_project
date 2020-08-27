const express = require("express");

let api = express.Router(),
  personaControlador = require("../controladores/personaCRUD"),
  send_mail = require("../controladores/send_mailCRUD");


api.get("/persona", personaControlador.getData);

api.post("/persona", personaControlador.postData);
api.post("/login", personaControlador.login);
api.post("/send_mail", send_mail);

api.put("/persona/:id", personaControlador.putData);

api.delete("/persona/:id", personaControlador.deleteData);

module.exports = api;
