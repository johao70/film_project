const express = require("express");

let api = express.Router(),
  sala_pelicula = require("../controladores/sala_peliculaCRUD");

api.get("/sala_pelicula", sala_pelicula.getData);

api.post("/sala_pelicula", sala_pelicula.postData);

api.put("/sala_pelicula/:id", sala_pelicula.putData);

api.delete("/sala_pelicula/:id", sala_pelicula.deleteData);

module.exports = api;
