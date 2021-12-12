const express = require("express");
const cors = require("cors");

class Server {
  // Cuando llamemos al constructor al final vamos a llamar las rutas.
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // Acceso al directorio público
    this.app.use(express.static("public"));

    // CORS
    this.app.use(cors());

    // Lectura del body recibido
    this.app.use (express.json())

  }

  // Creamos los métodos
  routes() {
    this.app.use("/api/users", require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionando en el puerto", this.port);
    });
  }
}

module.exports = Server;
