const express = require("express");

let api = express.Router(),
  userController = require("../controllers/personaCRUD");

api.get("/persona", userController.getData);
api.post("/persona", userController.postData);
api.put("/persona/:id", userController.putData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO
api.delete("/persona/:id", userController.deleteData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO

api.post("/login", userController.login);

module.exports = api;
