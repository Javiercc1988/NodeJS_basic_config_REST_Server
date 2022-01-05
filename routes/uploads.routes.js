const { Router } = require("express");
const { check } = require("express-validator");

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary, mostrarImagenCloudinary } = require("../controllers/uploads.controller.js");
const { coleccionesPermitidas } = require("../helpers");

const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();

router.get("/:coleccion/:id", 
[
    check("id","El id debe ser un id válido de mongoDB").isMongoId(),
    check("coleccion").custom(coleccion => coleccionesPermitidas(coleccion, ["usuarios","productos"])),
    validarCampos
],
mostrarImagenCloudinary
)

router.post("/", validarArchivoSubir, cargarArchivo);

router.put("/:coleccion/:id", 
    [
        validarArchivoSubir,
        check("id","El id debe ser un id válido de mongoDB").isMongoId(),
        check("coleccion").custom(coleccion => coleccionesPermitidas(coleccion, ["usuarios","productos"])),
        validarCampos
    ],
 actualizarImagenCloudinary)


module.exports = router;
