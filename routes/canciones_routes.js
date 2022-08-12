const express = require("express");
const router = express.Router();
const Cancion = require("../models/cancion.js")

router.post("/", async (req, res) => {
    console.log("Datos recibidos... " + JSON.stringify(req.body));
    const cancion = new Cancion({
        nombre: req.body.infocancion.nombre,
        grupo: req.body.infocancion.grupo,
        anio: req.body.infocancion.anio,
        genero: req.body.infocancion.genero,
    });
    try {
        const nuevaCancion = await cancion.save();
        res.status(201).json(nuevaCancion);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async(req, res) => {
    try {
        const cancion = await Cancion.find();
        res.status(201).json(cancion);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async(req, res) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        const cancionjson = [cancion];
        res.status(201).json(cancionjson);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        await cancion.remove();
        res.status(201).json("Cancion Eliminada");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        cancion.nombre = req.body.infocancion.nombre,
        cancion.grupo = req.body.infocancion.grupo,
        cancion.anio = req.body.infocancion.anio,
        cancion.genero = req.body.infocancion.genero
        await cancion.save();
        res.status(201).json({ message: "Canción Editada con Éxito." })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;