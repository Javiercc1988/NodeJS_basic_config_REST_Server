
const busquedasBD   = require("./busquedas")
const dbValidators  = require("./db-validators")
const generarJWT    = require("./generar-jwt")
const googleVerify  = require("./google-verify")
const subirArchivo  = require("./subir-archivo")

module.exports = {
    ...busquedasBD,
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}