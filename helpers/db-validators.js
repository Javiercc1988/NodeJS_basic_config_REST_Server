// Crearemos nuestras validaciones personalizadas.

const Role = require("../models/role");
const User = require("../models/users");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la bbdd.`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await User.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El email ${correo} ya está registrado.`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuarioPorId) {
    throw new Error(`El id: ${id} no existe.`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
};
