const { response } = require("express");
const {
  buscarUsuarios,
  buscarProductos,
  buscarCategoria,
} = require("../helpers/busquedas");

const coleccionesPermitidas = ["categoria", "productos", "usuarios", "roles"];

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `El valor: ${coleccion}, no existe. Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categoria":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Falta crear esta opción",
      });
  }
};

module.exports = {
  buscar,
};
