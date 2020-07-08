const express = require("express");

let api = express.Router(),
  sala = require("../controladores/salaCRUD");

api.get("/sala", sala.getData);
api.post("/sala", sala.postData);
api.put("/sala/:id", sala.putData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO
api.delete("/sala/:id", sala.deleteData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO

module.exports = api;
