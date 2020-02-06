'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    idPelicula: DataTypes.INTEGER,
    idHorario: DataTypes.INTEGER
  }, {});
  Sala.associate = function(models) {
    // associations can be defined here
  };
  return Sala;
};