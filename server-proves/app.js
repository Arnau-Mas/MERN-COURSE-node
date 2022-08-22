import express, { json } from "express";
import cors from "cors";
const app = express();

app.use(json());
app.use(cors());

const NOTES = [
    {
        id:1,
        text:"cos de la nota 1"
    },
    {
        id:2,
        text:"cos de la nota 2 adsfksafl"
    }
]

app.get("/", (req,res) => {
    res.send("Api de notes, ves a /notes")
})

app.get("/notes", (req,res) => {
    res.json(NOTES)
})

app.post("/notes", (req,res) => {
    console.log(req.body)
    if(req.body.text){
        let newNote = {
            id: NOTES.length+1,
            text:req.body.text
        }
        NOTES.push(newNote);
        res.json(newNote);
    }
    res.send("error 404");
})


app.listen(3000, () => console.log("Corrent en el port http://localhost:3000"))