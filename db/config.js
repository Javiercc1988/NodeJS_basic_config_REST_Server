const mongoose = require("mongoose");


// Realizaremos la petición de conexión de forma asincrona 
// controlada por si ocurriese cualquier tipo de error

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Base de datos en cluster ONLINE")
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BBDD");
  }
};

module.exports = {
  dbConnection,
};
