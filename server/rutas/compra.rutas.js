const express = require("express");

let api = express.Router(),
  compra = require("../controladores/compraCRUD");

api.get("/compra", compra.getData);

api.post("/compra", compra.postData);

api.put("/compra/:id", compra.putData);

api.delete("/compra/:id", compra.deleteData);

module.exports = api;
