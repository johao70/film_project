const express = require("express");

let api = express.Router(),
  horario = require("../controladores/horarioCRUD");

api.get("/horario", horario.getData);

api.post("/horario", horario.postData);

api.put("/horario/:id", horario.putData);

api.delete("/horario/:id", horario.deleteData);

module.exports = api;
