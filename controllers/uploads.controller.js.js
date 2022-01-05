// IMPORTS

const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL)


const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Users, Producto } = require("../models");

// MAIN
const formatosImagenes = ["jpg", "png", "jpeg", "gif"];


// Subir al archivo
const cargarArchivo = async (req, res = response) => {

  try {

    // Subida de imagenes
    const nombreFichero = await subirArchivo( req.files, formatosImagenes, "imgs" );
    res.json({ nombreFichero });

  } catch (msg) {

    res.status(400).json({ msg });

  }
};


// Actualizar imagen para el USUARIO y para el PRODUCTO sin utilizar un servicio de hosting de imagenes
const actualizarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {

    case "usuarios":
      modelo = await Users.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe el usuario con id: ${id}` });
      }
      break;

    case "productos":      
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con id: ${ id }` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Esto no está validado" });
  }

  // Limpiar antiguas imagenes antes de subir las nuevas

  try{
    if(modelo.img){
      // Borrar la imagen del servidor
      const pathImagen = path.join(__dirname,"../uploads",coleccion, modelo.img)

      if(fs.existsSync(pathImagen)){
        // Si la imagen existe vamos a eliminarla para sustituirla por la nueva imagen.
        fs.unlinkSync(pathImagen);
      }
    }
  }catch(err){

    return res.status(500).json({ msg: "Error al reemplazar la imagen anterior imagen en el servidor"})
  }

    const nombreFichero = await subirArchivo( req.files, formatosImagenes, coleccion );
    modelo.img = nombreFichero
  
    await modelo.save()

  res.json({
    modelo
  });
};


const actualizarImagenCloudinary = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {

    case "usuarios":
      modelo = await Users.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe el usuario con id: ${id}` });
      }
      break;

    case "productos":      
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con id: ${ id }` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Esto no está validado" });
  }

  // Limpiar antiguas imagenes antes de subir las nuevas

  try{
    if(modelo.img){
      // Borrar la imagen del servidor
      const nombreArray = modelo.img.split("/");

      const nombre = nombreArray[ nombreArray.length - 1]

      // Extraemos el id público de la imagen en cloudinary.
      const [ public_id ] = nombre.split(".");

      // Borramos la antigua imagen
      cloudinary.uploader.destroy( public_id );
    }

    // Subir a Cloudinary
    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo)

  } catch(err){

    return res.status(500).json({ msg: "Error al reemplazar la imagen anterior en el servidor"})
  }
};

// Mostar imagen de USUARIO y de PRODUCTO.
const mostrarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {

    case "usuarios":
      modelo = await Users.findById(id);
        if (!modelo) {
          return res.status(400).json({ msg: `No existe el usuario con id: ${id}` });
        }
      break;

    case "productos":      
      modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({ msg: `No existe un producto con id: ${ id }` });
        }
      break;

    default:
      return res.status(500).json({ msg: "Esto no está validado" });
  }

  // Limpiar antiguas imagenes antes de subir las nuevas
  try{
    if(modelo.img){
      // Extraer la ruta de la imagen
      const pathImagen = path.join(__dirname,"../uploads",coleccion, modelo.img)

      if(fs.existsSync( pathImagen )){
        // Confirmamos que la imagen existe y la retornamos
        return res.sendFile( pathImagen )
      }
    }
  } catch(err) {
    return res.status(500).json({ msg: "Error al borrar la imagen del servidor" })
  }

  const pathNoImagen = path.join(__dirname,"../assets/no-image.jpg")

  res.sendFile( pathNoImagen);
}


const mostrarImagenCloudinary = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {

    case "usuarios":
      modelo = await Users.findById(id);
        if (!modelo) {
          return res.status(400).json({ msg: `No existe el usuario con id: ${id}` });
        }
      break;

    case "productos":      
      modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({ msg: `No existe un producto con id: ${ id }` });
        }
      break;

    default:
      return res.status(500).json({ msg: "Esto no está validado" });
  }

  try{
    if(modelo.img){
      return res.redirect( modelo.img )
    }

  } catch(err) {
    return res.status(500).json({ msg: "Error al borrar la imagen del servidor" })
  }

  const pathNoImagen = path.join(__dirname,"../assets/no-image.jpg")

  res.sendFile( pathNoImagen);
}


module.exports = {
  cargarArchivo,
  actualizarImagen,
  actualizarImagenCloudinary,
  mostrarImagen,
  mostrarImagenCloudinary
};
