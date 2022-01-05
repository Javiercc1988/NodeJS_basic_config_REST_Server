// Crearemos nuestras validaciones personalizadas.
const res = require("express/lib/response");
const { Categoria, Users, Role, Producto } = require("../models");

/****************************************************************** */

/* VALIDACIONES DE USUARIO */
const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la bbdd.`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Users.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El email ${correo} ya está registrado.`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Users.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id} no existe.`);
  }
};

/****************************************************************** */
/* VALIDACIONES DE CATEGORIAS */
const categoriaExiste = async (nombre = "") => {
  const existeCategoria = await Categoria.findOne({ nombre });
  if (existeCategoria) {
    throw new Error(`La categoria: ${nombre}, ya existe.`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id: ${id} no existe.`);
  }
};


/****************************************************************** */
// VALIDACIONES DE PRODUCTOS 
const productoExiste = async (nombre = "") => {
  const existeProducto = await Producto.findOne({ nombre });
  if (existeProducto) {
    throw new Error(`El producto: ${nombre}, ya existe.`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id de producto: ${id} no existe.`);
  }
};

/****************************************************************** */
// VALIDAR COLECCIONES PERMITIDAS

const coleccionesPermitidas = (coleccion,colecciones = []) => {
  const incluida = colecciones.includes(coleccion)

  if(!incluida) {
    throw new Error(`La coleccion ${coleccion}, no existe. Use: ${colecciones}`)
  }

  return true
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  categoriaExiste,
  existeCategoriaPorId,
  productoExiste,
  existeProductoPorId,
  coleccionesPermitidas,
};
