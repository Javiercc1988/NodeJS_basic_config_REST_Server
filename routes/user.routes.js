const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controller");

const { validarCampos } = require("../middlewares/validar-campos");
const Role = require("../models/role");
const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe tener más de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    // check("rol", "No es un rol válido").isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la bbdd.`);
      }
    }),
    validarCampos,
    // ValidarCampos es nuestro propio middleware que se encarga de devolver el control de errores si existen.
  ],
  usersPost
);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
