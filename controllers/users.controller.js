const { response } = require("express");

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
  const body = req.body;

  const user = new User(body);

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
