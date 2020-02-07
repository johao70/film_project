const Sequelize = require("sequelize");

const db = require("../config/db");

const pelicula = require("./pelicula")
const horario = require("./horario")

module.exports = db.sequelize.define("sala", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  descripcion: {
    type: Sequelize.STRING
  },
  idpelicula: {
    type: Sequelize.INTEGER,
    references: {
      model: pelicula,
      key: 'id'
    }
  },
  idhorario: {
    type: Sequelize.INTEGER,
    references: {
      model: horario,
      key: 'id'
    }
  }
});