import express from "express";
import { DataTypes } from "sequelize";
import sqz from "./database/loadSequelize.js";
import routerContactes from "./routes/routerContactes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/contactes", routerContactes);


const Contacte = sqz.define('Contacte', {
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    telephone:DataTypes.INTEGER,
    age:DataTypes.INTEGER
}, { tableName: 'contactes', timestamps: false });

app.get("/", (req,res) => res.send("api"))
 
app.get("/contactes", (req,res) => {
    

});

app.listen(3000, () => console.log("Server running at http://localhost:3000"))