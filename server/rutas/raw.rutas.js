const express = require("express");

let api = express.Router(),
  raw = require("../controladores/raw_CRUD");

api.get("/raw1", raw.raw1);
api.get("/raw2", raw.raw2);
api.get("/raw3", raw.raw3);
api.get("/raw4", raw.raw4);

module.exports = api;
