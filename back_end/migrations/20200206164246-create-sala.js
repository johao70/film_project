'use strict';

const Pelicula = require("../models/pelicula");
const Horario = require("../models/horario");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Salas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      idPelicula: {
        type: Sequelize.INTEGER,
        references:{
          model: Pelicula,
          key: 'id'
        }
      },
      idHorario: {
        type: Sequelize.INTEGER,
        references:{
          model: Horario,
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Salas');
  }
};