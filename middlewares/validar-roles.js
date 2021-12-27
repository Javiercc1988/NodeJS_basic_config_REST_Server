const esAdminRole = (req, res, next) => {
  /* Este middleware se colocará despues de validar-jwt esto nos permite llamar a req.usuario que se generó allí ya que la request es para todos la misma y va heredando los datos cargados */

  if (!req.usuario) {
    // Esta validación es por si ponemos en la ruta esta validación antes de la de validar-jwt
    return res.status(500).json({
      msg: "Se quiere verificar el role sin válidar el token primero",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} es rol ${rol} necesita tener ADMIN_ROLE`,
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      // Esta validación es por si ponemos en la ruta esta validación antes de la de validar-jwt
      return res.status(500).json({
        msg: "Se quiere verificar el role sin válidar el token primero",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
