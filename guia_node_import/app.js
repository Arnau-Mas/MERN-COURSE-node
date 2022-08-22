
import express from "express";
import conversions from "./conversions.js";
const app = express();
/* console.log("10km a milles", conversions.km2m(Number(process.argv[2])))
console.log("10 milles a km", conversions.mk2m(10))
console.log("10 farenheit a celsius", conversions.f2c(10))
console.log("10 celsius a farenheit", conversions.c2f(10)) */

// console.log(process.argv) a través del process.argv podem accedir als arguments que estan acompanyant a l'ordre que li passes a la command line de node app.js x y. Això és l'equivalent a introduir com si fos un prompt
/* console.log("++", process.argv[2]) */

const llista = [1,2,3,4]

app.get("/", (req,res) => {
    console.log("params", req.params)
    res.send("El meu servidor amb Express")
})

app.get("/llista", (req,res) => {
    res.json(llista) //no fa falta convertir l'objecte en json ja que ho fa el res.json automaticament
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
});