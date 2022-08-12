require("dotenv").config();
var express = require("express");
var app = express();
var mongoose = require('mongoose');

// conexión con la bd
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a la Base de Datos"));

//CONFIGURACION DE RUTAS DE SERVIDOR
app.use(express.json());
const cancionesRoutes = require("./routes/canciones_routes");
app.use("/canciones", cancionesRoutes);

app.use(express.static("media"));

//COMANDO DE EJECUCION DE SERVIDOR
var server = app.listen(process.env.PORT || 5000, function(){
    console.log("Servidor escuchando en el puerto" , app.get('port'));
});