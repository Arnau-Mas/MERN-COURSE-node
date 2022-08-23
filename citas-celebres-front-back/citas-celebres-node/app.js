import express from "express";
import cors from "cors";
import QUOTES from "./quotes.js";

const app = express();

app.use(cors());
app.use(express.static("public"))

app.get("/citas", (req,res) => {
    res.json(QUOTES)
})

app.get("/citarandom", (req,res) => {
    let randomQuote = QUOTES[Math.floor(Math.random()*QUOTES.length)];
    res.json(randomQuote)
})

app.get("*", (req,res) => {
    res.send("Ruta no existeix")
})

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
})