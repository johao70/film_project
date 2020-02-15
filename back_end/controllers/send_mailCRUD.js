const nodemailer = require("nodemailer");

const db = require("../config/db");

const sendMail = (req, res) => {  
    const datos = req.body.datos

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'login',
            user: '',
            pass: ''
        }
    });

    const mailOptions = {
        from: 'cine@yavirac.edu.ec',
        to: datos.correo,
        subject: 'Cine Yavirac',
        html: `<div><h1>CINE YAVIRAC</h1><br><h2>Sala: ${datos.sala}</h2><br><h2>Película: ${datos.pelicula}</h2><br><h2>Horario: ${datos.horario}</h2><br><h2>Número de Boletos: ${datos.boletos}</h2></div>`
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${ err }`
            })
        } else {
            return res.status(200).json({
                ok: true,
                datos: "Correo Enviado"
            })
        }
    })
}

const raw = (req, res) => {
    const pelicula = req.query.pelicula
    const horario = req.query.horario

    db.sequelize.query(`select sala_peliculas.id, peliculas.titulo as idpelicula, horarios.hora as idhorario, salas.nombre as idsala from sala_peliculas join peliculas on peliculas.id = sala_peliculas.idpelicula join horarios on horarios.id = sala_peliculas.idhorario join salas on salas.id = sala_peliculas.idsala where peliculas.id=${ pelicula } and horarios.id=${ horario };`, { type: db.sequelize.QueryTypes.SELECT})
    .then(response => {
        return res.status(200).json({
                ok: true,
                datos: response
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
    sendMail,
    raw,
}