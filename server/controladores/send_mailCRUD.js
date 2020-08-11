const nodemailer = require("nodemailer");

const sendMail = (req, res) => {
  const { datos } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "login",
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "cine@gmail.com",
    to: datos.correo,
    subject: "Comprobante",
    html: `<div><h1>CINE</h1><br><h2>Sala: ${datos.sala}</h2><br><h2>Película: ${datos.pelicula}</h2><br><h2>Horario: ${datos.horario}</h2><br><h2>Número de Boletos: ${datos.numero_boletos}</h2></div>`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${err}`,
      });
    } else {
      return res.status(200).json({
        ok: true,
        datos: "Correo Enviado",
      });
    }
  });
};

module.exports = sendMail;
