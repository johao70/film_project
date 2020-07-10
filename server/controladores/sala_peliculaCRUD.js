const Sala_pelicula = require("../models/sala_pelicula");

let getData = (req, res) => {
  let { query } = req;

  Sala_pelicula.findAll({ where: query })
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

  Sala_pelicula.create(datos)
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

  Sala_pelicula.update(datos, { where: { id } })
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

  Sala_pelicula.destroy({ where: { id } }).then(() => {
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

module.exports = {
  getData,
  postData,
  putData,
  deleteData,
};
