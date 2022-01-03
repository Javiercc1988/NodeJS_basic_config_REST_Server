const { response } = require("express");

const { Categoria } = require("../models");

const obtenerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // Solo nos interesan los usuarios con estado true, para saber que no son usuarios 'borrados' de la bbdd

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  // Hacemos una desestructuración de array y utilizamos Promise.all para realizar las query simultaneamente recortando mucho el tiempo de la consulta.

  res.json({ total, categorias });
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

const crearCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  try {
    if (categoriaDB) {
      return res.status(400).json({
        msg: `La categoria ${categoriaDB.nombre} ya existe`,
      });
    }

    // Generar data a guardar
    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);

    // Guardar en bbdd
    await categoria.save();

    res.status(201).json(categoria);
  } catch (error) {
    return res.status(500).json({
      msg: "Se ha producido un error al crear la categoria en la bbdd",
    });
  }
};

const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

const borrarCategoria = async (req, res) => {
  const { id } = req.params;

  const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{ estado: false },{ new: true });

  res.json({
    categoriaBorrada,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
