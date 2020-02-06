'use strict';
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('Persona', {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    clave: DataTypes.STRING,
    rol: DataTypes.STRING
  }, {});
  Persona.associate = function(models) {
    // associations can be defined here
  };
  return Persona;
};