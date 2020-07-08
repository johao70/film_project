const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3000;

app.listen(port, (err) => {
  !err
    ? console.log(`El servidor esta funcionando en http://localhost:${port}/`)
    : console.log(`El servidor no esta funcionando`);
});
