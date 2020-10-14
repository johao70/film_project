const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors");

let app = express(),
  personaRutas = require("../rutas/persona.rutas"),
  compraRutas = require("../rutas/compra.rutas"),
  horarioRutas = require("../rutas/horario.rutas"),
  peliculaRutas = require("../rutas/pelicula.rutas"),
  salaRutas = require("../rutas/sala.rutas"),
  sala_peliculaRutas = require("../rutas/sala_pelicula.rutas"),
  rawRutas = require("../rutas/raw.rutas");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(cors());

//Rutas
app.get("/", (req, res) => res.send("Welcome"));
app.use("/film", personaRutas);
app.use("/film", compraRutas);
app.use("/film", horarioRutas);
app.use("/film", peliculaRutas);
app.use("/film", salaRutas);
app.use("/film", sala_peliculaRutas);
app.use("/film", rawRutas);

module.exports = app;
