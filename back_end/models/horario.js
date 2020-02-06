'use strict';
module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define('Horario', {
    hora: DataTypes.STRING
  }, {});
  Horario.associate = function(models) {
    // associations can be defined here
  };
  return Horario;
};