const models = require('../models');

const getData = (req, res) => {
    const { query } = req;
    models.Persona.findAll({ where: query })
    .then( response => {
        res.json(response);
    })
    .catch(err => {
        res.send("error: " + err);
    });
}

const postData = (req, res) => {
    const datos = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        clave: req.body.clave,
        rol: req.body.rol,
    };

    if (!datos) {
        res.status(400);
        res,
            json({
                error: "Solicitud Incorrecta"
            });
    } else {
        models.Persona.create(datos)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.json("error: " + err);
        });
    }
}

module.exports = {
    getData,
    postData,
}
