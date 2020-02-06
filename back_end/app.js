const express = require('express');

const app = new express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Bienvenido")
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})