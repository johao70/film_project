'use strict';

const Persona= require("../models/persona");
const Sala= require("../models/sala");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroBoletos: {
        type: Sequelize.INTEGER
      },
      idPersona: {
        type: Sequelize.INTEGER,
        references:{
          model: Persona,
          key: 'id'
        }
      },
      idSala: {
        type: Sequelize.INTEGER,
        references:{
          model: Sala,
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
    return queryInterface.dropTable('Compras');
  }
};