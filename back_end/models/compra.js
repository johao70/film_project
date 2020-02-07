'use strict';
module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('Compra', {
    numeroBoletos: DataTypes.NUMBER
  }, {});
  Compra.associate = function(models) {
    Compra.hasMany(models.Persona),
    Compra.hasMany(models.Sala)
  };
  return Compra;
};