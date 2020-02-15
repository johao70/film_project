require('dotenv').config();

const nodemailer = require("nodemailer");

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
        html: `<div><h1>CINE YAVIRAC</h1><br><h2>Sala: ${datos.sala}</h2><br><h2>Película: ${datos.pelicula}</h2><br><h2>Horario: ${datos.horario}</h2></div>`
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('ENVIADO')
        }
    })
}

module.exports = {
    sendMail,
}