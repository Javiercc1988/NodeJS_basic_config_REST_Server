const { response } = require("express");
const { validationResult} = require('express-validator')
const bcryptjs = require("bcryptjs");

const User = require("../models/users");

const usersGet = (req, res = response) => {
  const { query, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - Controller",
    query,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req, res) => {

  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    return res.status(400).json(validationErrors)
  }

  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });

  // Verificar si el correo existe
  const existeEmail = await User.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya está registrado",
    });
  }
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BBDD
  await user.save();

  res.json({
    msg: "post API - Controller",
    user,
  });
};

const usersPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "Put API - Controller",
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "Patch API - Controller",
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "Delete API - Controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
