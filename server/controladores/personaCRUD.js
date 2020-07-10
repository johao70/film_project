const Persona = require("../models/persona");

let getData = (req, res) => {
  let { query } = req;

  Persona.findAll({ where: query })
    .then((response) => {
      return res.status(200).json({
        ok: true,
        datos: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`,
      });
    });
};

let postData = (req, res) => {
  let { datos } = req.body;

  Persona.create(datos)
    .then((response) => {
      return res.status(200).json({
        ok: true,
        datos: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`,
      });
    });
};

let putData = (req, res) => {
  let { id } = req.params,
    { datos } = req.body;

  Persona.update(datos, { where: { id } })
    .then(() => {
      return res.status(200).json({
        ok: true,
        datos: datos,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${error}`,
      });
    });
};

let deleteData = (req, res) => {
  let { id } = req.params;

  Persona.destroy({ where: { id } }).then(() => {
    return res
      .status(200)
      .json({
        ok: true,
        datos: "Eliminado",
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          datos: null,
          mensaje: `Error del servidor: ${error}`,
        });
      });
  });
};

let login = (req, res) => {
  let { correo, clave } = req.body;

  Persona.findAll().then((resultado) => {
    resultado.forEach((element) => {
      if (element.correo === correo && element.clave == clave) {
        res.status(200).json({
          ok: true,
          mensaje: "found",
        });
      }
    });
    return res.status(500).json({
      ok: false,
      mensaje: "no-found",
    });
  });
};

module.exports = {
  getData,
  postData,
  putData,
  deleteData,
  login,
};
