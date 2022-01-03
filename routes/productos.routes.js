const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos.controller");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const {productoExiste, existeProductoPorId} = require("../helpers/db-validators");
const router = Router();

// OBTENER UN LISTADO DE TODOS LOS PRODUCTOS
router.get("/", obtenerProductos);

// OBTENER UN PRODUCTO POR ID EN URL
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// CREAR UN NUEVO PRODUCTO
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

router.put("/:id",
[
  validarJWT,
  check("id","No es un ID válido").isMongoId(),
  check("id").custom(existeProductoPorId),
  validarCampos,
],
actualizarProducto
);

router.delete("/:id",
[
  validarJWT,
  esAdminRole,
  check("id","No es un ID válido").isMongoId(),
  check("id").custom(existeProductoPorId),
  validarCampos,
],
borrarProducto)


module.exports = router;
