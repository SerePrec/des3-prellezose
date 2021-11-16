const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`Servidor http escuchando en puerto ${server.address().port}`)
);
server.on("error", error =>
  console.log(`Ocurrió un error en el servidor:\n ${error}`)
);
