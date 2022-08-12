const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    grupo: {
        type: String,
        required: true,
    },
    anio: {
        type: Number,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Cancion", cancionSchema)