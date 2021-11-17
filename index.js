const express = require("express");
const app = express();

// Importo e inicializo la instancia. Método Asíncrono
const Contenedor = require("./clase");
const productos = new Contenedor("productos.txt");
productos.init();

const PORT = process.env.PORT || 8080;

app
  .get("/productos", async (req, res) => {
    const lista = await productos.getAll();
    lista !== null
      ? res.send(lista)
      : res.send({
          message: "No se pudo recuperar la infomación"
        });
  })
  .get("/productoRandom", async (req, res) => {
    const maxId = productos.nextId - 1;
    const randomId = Math.floor(Math.random() * maxId + 1);
    const product = await productos.getById(randomId);
    product
      ? res.send(product)
      : res.send({
          message: `No se encuentra el producto con el id:${randomId}`
        });
  });

const server = app.listen(PORT, () =>
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
);
server.on("error", error =>
  console.log(`Ocurrió un error en el servidor:\n ${error}`)
);
