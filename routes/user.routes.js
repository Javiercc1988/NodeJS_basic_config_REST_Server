const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controller");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const Role = require("../models/role");
const router = Router();

/*******************************************************************/

// RUTA PARA PETICIÓN GET
router.get("/", usersGet);

// RUTA PARA PETICIÓN PUT
router.put(
  "/:id",
  [
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),

    validarCampos,
  ],
  usersPut
);

// RUTA PARA PETICIÓN POST
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe tener más de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo", "La cuenta de correo ya existe.").custom(emailExiste),
    check("rol").custom(esRoleValido),

    validarCampos,
    // ValidarCampos es nuestro propio middleware que se encarga de devolver el control de errores si existen.
  ],
  usersPost
);

// RUTA PARA PETICIÓN PATCH
router.patch("/", usersPatch);

// RUTA PARA PETICIÓN DELETE
router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole, // Este middleware forzaria a solo usuarios ADMIN, con tieneRole le damos la opción de pasar una lista de argumentos para varios roles.
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usersDelete
);

module.exports = router;
