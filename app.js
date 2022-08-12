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
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const cancionesRoutes = require("./routes/canciones_routes");
app.use("/canciones", cancionesRoutes);

app.use(express.static("media"));

//COMANDO DE EJECUCION DE SERVIDOR
var server = app.listen(process.env.PORT || 5000, function(){
    console.log("Servidor escuchando en el puerto" , app.get('port'));
});