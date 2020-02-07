'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sala = sequelize.define('Sala', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {});
  Sala.associate = function(models) {
    Sala.hasMany(models.Pelicula)
    Sala.hasMany(models.Horario)
  };
  return Sala;
};