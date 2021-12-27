const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");

class Server {
  // Cuando llamemos al constructor al final vamos a llamar las rutas.
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Acceso al directorio público
    this.app.use(express.static("public"));

    // CORS
    this.app.use(cors());

    // Lectura del body recibido
    this.app.use(express.json());
  }

  // Creamos los métodos
  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionando en el puerto", this.port);
    });
  }
}

module.exports = Server;
