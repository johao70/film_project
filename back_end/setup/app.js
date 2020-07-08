const express = require("express"),
  bodyParser = require("body-parser");
// cors = require("cors")

let app = express(),
  personaRutas = require("../rutas/persona.rutas"),
  compraRutas = require("../rutas/compra.rutas"),
  horarioRutas = require("../rutas/horario.rutas"),
  peliculaRutas = require("../rutas/pelicula.rutas"),
  salaRutas = require("../rutas/sala.rutas"),
  sala_peliculaRutas = require("../rutas/sala_pelicula.rutas"),
  rawRutas = require("../rutas/raw.rutas");
// corsOptions = {
//   origin: "http://localhost:4200",
//   optionsSuccessStatus: 200,
// };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//Cors configuration
//app.use(cors(corsOptions));

//Routes
app.get("/", (req, res) => res.send("Bienvenido"));
app.use("/api", personaRutas);
app.use("/api", compraRutas);
app.use("/api", horarioRutas);
app.use("/api", peliculaRutas);
app.use("/api", salaRutas);
app.use("/api", sala_peliculaRutas);
app.use("/api", rawRutas);

module.exports = app;
