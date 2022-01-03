const { ObjectId } = require("mongoose").Types;
const { Users, Producto, Categoria } = require("../models");

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  // Devuelve True or False

  if (esMongoID) {
    const usuario = await Users.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
      // Si el usuario existe ENTONCES retornamos el arreglo con el usuario y SINO retornamos un arreglo vacío.
    });
  }

  const regex = new RegExp(termino, "i");
  // "i" --> insensitive para no hacer caso de mayúsculas y minúsculas

  const usuarios = await Users.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  // Devuelve True or False

  if (esMongoID) {
    const producto = await Producto.findById(termino)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre");
    return res.json({
      results: producto ? [producto] : [],
      // Si el usuario existe ENTONCES retornamos el arreglo con el usuario y SINO retornamos un arreglo vacío.
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  })
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  res.json({
    results: productos,
  });
};

const buscarCategoria = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);
  // Devuelve True or False

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
      // Si el usuario existe ENTONCES retornamos el arreglo con el usuario y SINO retornamos un arreglo vacío.
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
    results: categorias,
  });
};

module.exports = {
  buscarUsuarios,
  buscarProductos,
  buscarCategoria,
};
