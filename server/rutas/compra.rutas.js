const express = require("express");

let api = express.Router(),
  compra = require("../controladores/compraCRUD");

api.get("/compra", compra.getData);
api.post("/compra", compra.postData);
api.put("/compra/:id", compra.putData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO
api.delete("/compra/:id", compra.deleteData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO

module.exports = api;
