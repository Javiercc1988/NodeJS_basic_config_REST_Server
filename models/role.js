const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    require: [true, "Es necesario asignar un Rol al usuario"],
  },
});

module.exports = model("Role", RoleSchema);
