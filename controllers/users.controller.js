const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

// USER GET
const usersGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // Solo nos interesan los usuarios con estado true, para saber que no son usuarios 'borrados' de la bbdd

  const [total, usuarios] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  // Hacemos una desestructuración de array y utilizamos Promise.all para realizar las query simultaneamente recortando mucho el tiempo de la consulta.

  res.json({ total, usuarios });
};

// USER POST
const usersPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });

  // Encriptación de contraseña de usuario
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar el registro en la BBDD
  await user.save();

  res.json({
    user,
  });
};

// USER PUT
const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validación contra la BBDD
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

   const user = await User.findByIdAndUpdate(id, resto,{new:true});

  res.json(user);
};

// USER PATCH
const usersPatch = (req, res) => {
  res.json({
    msg: "Patch API - Controller",
  });
};

// USER DELETE
const usersDelete = async (req, res) => {
  const { id } = req.params;

  // Borrado fisicamente
  // const usuario = await User.findByIdAndDelete(id);

  // Para evitar perdida referencial en la bbdd en lugar de borrar fisicamente lo que hacemos es cambiar el estado
  // Esta es la forma más recomendada.
  const usuario = await User.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
