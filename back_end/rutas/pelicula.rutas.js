const express = require("express");

let api = express.Router(),
  pelicula = require("../controladores/peliculaCRUD");

api.get("/pelicula", pelicula.getData);
api.post("/pelicula", pelicula.postData);
api.put("/pelicula/:id", pelicula.putData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO
api.delete("/pelicula/:id", pelicula.deleteData); //SISTEMA REVISAR - MANDAR ID COMO PARAMETRO

module.exports = api;
