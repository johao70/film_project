const Persona = require('../models/persona');

const getData = (req, res) => {
    const { query } = req;
    Persona.findAll({ query })
    .then( response => {
        return res.status(200).json({
            ok: true,
            datos: response
        }) 
    })
    .catch( error => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${ error }` 
        })
    });
}

const postData = (req, res) => {
    const datos = req.body.datos
    
    if (!datos) {
        res.status(400);
        res,
            json({
                error: "Bad Request"
            });
    } else {
        Persona.create(datos)
            .then( response => {
                return res.status(200).json({
                    ok: true,
                    datos: response
                })
            })
            .catch( error => {
                return res.status(500).json({
                    ok: false,
                    datos: null,
                    mensaje: `Error del servidor: ${ error }` 
                })
            });
    }
}

const putData = (req, res) => {
    const datos = req.body.datos
    const data = Persona.findAll({ where: datos.id });
    
    if (data.length > 0) {
        data.forEach( element => {
            element.update({ id, nombre, correo, clave, rol, });
        });
    }
    return res.json({
        message: "actualizado",
        data: data
    })
}

const deleteData = (req, res) => {
    const { id } = req.query;
    
    Persona.destroy({ where: { id } })
    .then( response => {
        return res.status(200).json({
            ok: true,
            datos: "Eliminado"
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${ error }` 
            })
        })
    })
}

module.exports = {
    getData,
    postData,
    putData,
    deleteData,
}
