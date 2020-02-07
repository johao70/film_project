'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Compras',
      'idPersona',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Personas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Compras', // name of Target model
        'idSala', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Salas', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Salas', // name of Target model
        'idPelicula', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Peliculas', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Salas', // name of Target model
        'idHorario', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Horarios', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Compras',
      'idPersona'
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Compras', // name of the Target model
        'idSala' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Salas', // name of the Target model
        'idPelicula' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Salas', // name of the Target model
        'idHorario' // key we want to remove
      );
    })
  }
};
