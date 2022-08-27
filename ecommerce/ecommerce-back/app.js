import express from "express";
import { AggregateError, DataTypes } from "sequelize";
import sequelize from "./loadSequelize.js";
import cors from "cors";
import articulosRouter from "./routes/articulosRouter.js";
import clientesRouter from "./routes/clientesRouter.js";
import facturasRouter from "./routes/facturasRouter.js";
import lineasRouter from "./routes/lineasRouter.js"
const app = express();

app.use(express.json())
app.use(cors());
app.use("/articulos", articulosRouter)
app.use("/clientes", clientesRouter)
app.use("/facturas", facturasRouter)
app.use("/lineas", lineasRouter)
app.get("/", (req,res) => res.send("api"))
 

app.listen(3000, () => console.log("Server running at http://localhost:3000"));