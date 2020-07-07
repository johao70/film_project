const express = require("express"),
  bodyParser = require("body-parser");
// cors = require("cors")

let app = express(),
  userRoutes = require("../routes/users.routes");
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
app.use("/api", userRoutes);

module.exports = app;
