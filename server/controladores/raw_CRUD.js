const db = require("../config/db");

let raw2 = (req, res) => {
  let { idpelicula } = req.query;

  db.sequelize
    .query(
      `select id, idpelicula, (select f_pelicula(idpelicula)) as idpelicula_titulo, idsala, (select f_sala(idsala)) as idsala_nombre, idhorario, (select f_horario(idhorario)) as idhorario_hora from sala_peliculas where idpelicula=${idpelicula};`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
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

let raw3 = (req, res) => {
  db.sequelize
    .query(
      `select id, idpelicula, (select f_pelicula(idpelicula)) as idpelicula_titulo, idsala, (select f_sala(idsala)) as idsala_nombre, idhorario, (select f_horario(idhorario)) as idhorario_hora from sala_peliculas;`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
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

let raw4 = (req, res) => {
  db.sequelize
    .query(
      `select peliculas.titulo as label, peliculas.valorBoleto, sum(compras.numero_boletos) as value, sum(peliculas.valorBoleto*compras.numero_boletos) as recaudado from compras join sala_peliculas on sala_peliculas.id = compras.idsala_peliculas join peliculas on peliculas.id = sala_peliculas.idpelicula group by peliculas.titulo, peliculas.valorBoleto;`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
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

module.exports = {
  raw2,
  raw3,
  raw4,
};
