import express from "express";
import {DataTypes} from "sequelize";
import sequelize from "../loadSequelize.js";

const router = express.Router();

const Articulo = sequelize.define('Articulo', {
    idarticulos:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    nombre: DataTypes.STRING(150),
    descripcion:DataTypes.STRING(1500),
    precio:DataTypes.FLOAT(10,2),
    estoc:DataTypes.FLOAT(10,2)
}, { tableName: 'articulos', timestamps: false });


router.get("/", (req,res) => {
    sequelize.sync().then(() => { 
        Articulo.findAll()
            .then(articulos =>{
                res.json({ 
                    ok: true,
                    data: articulos
                })
            }
            )
            .catch(error => {
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

router.get("/:id", (req,res) => {
    const id = req.params.id;
    sequelize.sync().then(() => { 
        Articulo.findOne({where: {idarticulos:id}})
            .then(articulo =>{
                res.json({ 
                    ok: true,
                    data: articulo
                })
            }
            )
            .catch(error => {
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

router.post('/', (req, res) => {
    sequelize.sync().then(() => {
        Articulo.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

/* router.put("/:id", (req,res) => {
    sequelize.sync().then(() => {
        Articulo.update(req.body)
    })
}) */

export default router;