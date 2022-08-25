import express from "express";
import {DataTypes} from "sequelize";
import sequelize from "../loadSequelize.js";

const router = express.Router();

const Cliente = sequelize.define("Cliente", {
    idclientes:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    email:DataTypes.STRING(150),
    nombre:DataTypes.STRING(150),
    direccion:DataTypes.STRING(150),
    poblacion:DataTypes.STRING(100),
    cpostal:DataTypes.STRING(10),
    password:DataTypes.STRING(150),
}, { tableName: 'clientes', timestamps: false })

router.get("/", (req,res) => {
    sequelize.sync().then(() => {
        Cliente.findAll()
            .then(clientes => {
                res.json({
                    ok:true,
                    data:clientes
                })
            })
            .catch(err => {
                res.json({
                    ok:false,
                    data:err.message
                })
            })
        .catch(err => {
            res.json({
                ok:false,
                data:err.message
            })
        })
    })
})

export default router;