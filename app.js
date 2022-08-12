require("dotenv").config();
var express = require("express");
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');

// conexión con la bd
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a la Base de Datos"));

//CONFIGURACION DE RUTAS DE SERVIDOR
app.use(express.json());
app.use(cors());
const cancionesRoutes = require("./routes/canciones_routes");
app.use("/canciones", cancionesRoutes);

app.use(express.static("media"));

//COMANDO DE EJECUCION DE SERVIDOR
var server = app.listen(5000, function(){
    console.log("Servidor escuchando en el puerto 5000");
});