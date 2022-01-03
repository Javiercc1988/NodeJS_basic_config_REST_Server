const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  // Leemos el token del header, el nombre que le asignemos es como tendrá que enviarlo el front puede ser x-token, authentication o como queramos.

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // Verificamos que el token no ha sido modificado

    const usuario = await Usuario.findById(uid);
    // Buscamos al usuario que corresponde con el token

    if (!usuario) {
      // Comprobar si usuario existe
      return res.status(401).json({
        msg: "Token no válido - usuario no registrado en la bbdd",
      });
    }

    if (!usuario.estado) {
      // Comprobar si el usuario está activo en la bbdd
      return res.status(401).json({
        msg: "Token no válido - usuario con estado false",
      });
    }

    req.usuario = usuario;
    // Dentro del objeto request creamos una propiedad nueva para no sobre escribir los headers

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
