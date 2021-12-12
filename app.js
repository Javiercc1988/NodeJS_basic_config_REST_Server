require("dotenv").config();
const Server = require("./models/server");

// Instanciamos nuestro servidor
const server = new Server();

// Lanzamos el método de escucha
server.listen();