const express = require("express");

let api = express.Router(),
  sala = require("../controladores/salaCRUD");

api.get("/sala", sala.getData);

api.post("/sala", sala.postData);

api.put("/sala/:id", sala.putData);

api.delete("/sala/:id", sala.deleteData);

module.exports = api;
