const fs = require("fs/promises");

class Contenedor {
  constructor(filename = "testDB.txt") {
    this.filename = filename;
    this.nextId = null; //porpio de cada instancia
  }

  // Para hacer más ordenado el código, manejar distintas situaciones y separar responsabilidades en los restantes métodos, genero un método inicializador.
  async init() {
    console.log("Inicializando contenedor...");
    try {
      if (this.nextId) return; // evita se inicialice más de una vez
      const content = await this.getAll();
      if (content === null) {
        await fs.writeFile(`./${this.filename}`, JSON.stringify([]));
        this.nextId = 1;
        console.log("Contenedor inicializado vacío");
      } else {
        const lastId = content.reduce(
          (acc, cur) => (cur.id > acc ? cur.id : acc),
          0
        );
        this.nextId = lastId + 1;
        console.log("Contenedor inicializado con archivo preexistente");
      }
    } catch (error) {
      console.log("Ocurrió un error al inicializar: ", error);
    }
  }

  async save(elemento) {
    try {
      const { title, price, thumbnail } = elemento;
      const id = this.nextId++;
      const producto = { id, title, price, thumbnail };
      const content = await this.getAll();
      content.push(producto);
      await fs.writeFile(
        `./${this.filename}`,
        JSON.stringify(content, null, 2)
      );
      console.log("Elemento guardado con éxito");
      return id;
    } catch (error) {
      console.log("Error al guardar el elemento", error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const match = content.find(elem => elem.id == id);
      return !!match ? match : null;
    } catch (error) {
      console.log(
        `Ocurrió un error al obtener el elemento con id: ${id}: `,
        error
      );
    }
  }

  async getAll() {
    try {
      const content = await fs.readFile(`./${this.filename}`, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.log("No se pudo recuperar archivo de datos");
      return null;
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const match = content.find(elem => elem.id == id);
      if (match) {
        const newContent = content.filter(elem => elem.id != id);
        await fs.writeFile(
          `./${this.filename}`,
          JSON.stringify(newContent, null, 2)
        );
        console.log(`El elemento con id: ${id} se eliminó con éxito`);
      } else {
        console.log(`No se encontró el elemento con el id: ${id}`);
      }
    } catch (error) {
      console.log(
        `Ocurrió un error al eliminar el elemento con id: ${id}: `,
        error
      );
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(`./${this.filename}`, JSON.stringify([]));
      console.log("Todos los elementos borrados con éxito");
    } catch (error) {
      console.log("Ocurrió un error al borrar todos los elementos", error);
    }
  }
}

module.exports = Contenedor;
