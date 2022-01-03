const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias.controller");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const {
  existeCategoriaPorId,
  categoriaExiste,
} = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - público
router.get("/", obtenerCategorias);

// Obtener una categorias por id - público
router.get(
  "/:id",
  [
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoría - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar - privado - cualquier con token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty(),
    check("nombre", "La categoria ya existe.").custom(categoriaExiste),
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(existeCategoriaPorId),

    validarCampos,
  ],
  actualizarCategoria
);

// Borrar - ADMIN - una categoria
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
