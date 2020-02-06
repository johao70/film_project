'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelicula = sequelize.define('Pelicula', {
    titulo: DataTypes.STRING,
    resumen: DataTypes.STRING,
    categoria: DataTypes.STRING,
    valorBoleto: DataTypes.STRING,
    estado: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {});
  Pelicula.associate = function(models) {
    // associations can be defined here
  };
  return Pelicula;
};