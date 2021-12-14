/* Mongo, a diferencia de las bbdd relacionales se graba en objetos { objetos: objetos } también conocidos como 'documento', los documentos se graban dentro de colecciones
y las colecciones para los que vienen de bbdd relacionales son como las tablas.*/

const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    // Podemos mandar un array para indicar un mensaje de error además de que es requerido
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: true,
    // No es posible repetir emails.
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria."],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
    // Este campo nos indicará si el usuario ha sido creado por google.
  },
});

module.exports = model("User", UserSchema);
