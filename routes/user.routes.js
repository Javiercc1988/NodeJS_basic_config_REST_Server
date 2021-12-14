const { Router } = require("express");
const { check} = require('express-validator')
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", usersGet);

router.post("/",[
  check('correo','El correo no es válido').isEmail()
  
], usersPost);

router.put("/", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
