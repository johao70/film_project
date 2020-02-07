const express = require('express');
const routes = require('./routes/routes')

const app = new express();
app.use(express.json());
const PORT = 5000;

app.use('/film', routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})