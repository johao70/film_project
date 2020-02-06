'use strict';
module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('Compra', {
    numeroBoletos: DataTypes.NUMBER,
    idPersona: DataTypes.INTEGER,
    idSala: DataTypes.INTEGER
  }, {});
  Compra.associate = function(models) {
    // associations can be defined here
  };
  return Compra;
};