import express from "express";
import { DataTypes } from "sequelize";
import sequelize from "./loadSequelize.js";
import cors from "cors"

const app = express();
const router = express.Router();

app.use(express.json())
app.use(cors());

const Linea = sequelize.define('Linea', {
    cantidad: DataTypes.FLOAT
}, { tableName: 'lineas', timestamps: false });

app.get("/", (req,res) => res.send("api"))
 
app.get("/lineas", (req,res) => {
    sequelize.sync().then(() => { 
        Linea.findAll()
            .then(lineas =>{
                console.log("entrant *************");
                res.json({ 
                    ok: true,
                    data: lineas
                })
            }
            )
            .catch(error => {
                console.log("********+error")
                res.json({
                    ok: false,
                    error: error.message
                })
            })
    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });

});


router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Linea.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));