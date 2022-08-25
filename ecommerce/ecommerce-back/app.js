import express from "express";
import { AggregateError, DataTypes } from "sequelize";
import sequelize from "./loadSequelize.js";
import cors from "cors";
import articulosRouter from "./routes/articulosRouter.js";
import clientesRouter from "./routes/clientesRouter.js";

const app = express();

app.use(express.json())
app.use(cors());
app.use("/articulos", articulosRouter)
app.use("/clientes", clientesRouter)

const Linea = sequelize.define('Linea', {
    idlineas:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
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


app.post('/lineas', function (req, res, next) {
    console.log(req.body)
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