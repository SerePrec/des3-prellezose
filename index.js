const Contenedor = require("./clase");

async function test() {
  try {
    // Instancio e inicializo el contenedor productos
    const productos = new Contenedor("productos.txt");
    await productos.init();

    //Guardo 3 elementos en productos
    const idA = await productos.save({
      title: "Escuadra",
      price: 123.45,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    });
    console.log("idA: ", idA);
    const idB = await productos.save({
      title: "Calculadora",
      price: 234.56,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    });
    console.log("idB: ", idB);
    const idC = await productos.save({
      title: "Globo Terráqueo",
      price: 345.67,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    });
    console.log("idC: ", idC);

    //Listo todos sus elementos
    console.log("\n\n***********************************");
    const all = await productos.getAll();
    console.log("Listado de todos los productos: \n", all);

    //Listo un elemento con id existente y otro con id  inexistente
    console.log("\n\n***********************************");
    let id = 3;
    const productA = await productos.getById(id);
    console.log(`Producto con id ${id}: \n`, productA);
    id = -5;
    const productB = await productos.getById(id);
    console.log(`Producto con id ${id}: \n`, productB);
  } catch (error) {
    console.log("Error durante el test: ", error);
  }
}

test();
