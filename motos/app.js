import express from "express";
import MOTOS from "./motos.js";
const app = express();

app.get("/", (req,res) => {
    res.send("Aplicació de Motos amb Node+Express");
})

app.get("/motos", (req,res) => {
    res.json(MOTOS)
})

app.get("/motos/:marca", (req,res) => {
    const marca = req.params.marca;
    const motosFiltrades = MOTOS.filter(moto => moto.marca === marca.toUpperCase());
    res.json(motosFiltrades)
})

app.get("/motos/kmmax/:kilometers", (req,res) => {
    const kilometers = Number(req.params.kilometers);
    const motosFiltrades = MOTOS.filter(moto => moto.km <= kilometers);
    res.json(motosFiltrades)
})

app.get("/motos/cc/:cc", (req,res) => {
    const cc = Number(req.params.cc);
    const motosFiltrades = MOTOS.filter(moto => moto.cc === cc);
    res.json(motosFiltrades)
})

app.listen(3000, () => {
    console.log("running in http://localhost:3000");
})