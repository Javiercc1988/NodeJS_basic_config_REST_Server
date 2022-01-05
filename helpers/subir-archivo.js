const path = require("path");
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, formatosValidos, directorio = "") => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split(".");
        const formato = nombreCortado[nombreCortado.length - 1];

        // Validar extensión
        if (!formatosValidos.includes(formato.toLowerCase())) {
        return reject(
            `El formato del fichero: ${formato} no se admite. Solo se admiten ${formatosValidos}`
        );
        }

        const nuevoNombreFichero = uuidv4() + "." + formato;
        // Renombramos los ficheros subidos con el paquete 'uuid' para evitar conflictos de uso del mismo nombre

        const uploadPath = path.join(__dirname, "../uploads", directorio, nuevoNombreFichero);

        archivo.mv(uploadPath, (err) => {
        if (err) {
            reject(err);
        };

        resolve(nuevoNombreFichero)
    });
  });
};



module.exports = {
  subirArchivo,
};
