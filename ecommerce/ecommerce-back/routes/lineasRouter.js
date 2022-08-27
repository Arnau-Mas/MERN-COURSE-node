import express from "express";
import {DataTypes} from "sequelize";
import sequelize from "../loadSequelize.js";

const router = express.Router();

const Articulo = sequelize.define('Articulo', {
    nombre: DataTypes.STRING(150),
    descripcion:DataTypes.STRING(1500),
    precio:DataTypes.FLOAT(10,2),
    estoc:DataTypes.FLOAT(10,2)
}, { tableName: 'articulos', timestamps: false });

const Factura = sequelize.define('Factura', {
    numero: DataTypes.STRING(15),
    fecha:DataTypes.DATE,
    direccion:DataTypes.STRING(150),
    poblacion:DataTypes.STRING(100),
    cpostal: DataTypes.STRING(10),
    nombre: DataTypes.STRING(150),
    ClienteId:DataTypes.INTEGER,
}, { tableName: 'facturas', timestamps: false });

const Linea = sequelize.define('Linea', {
    cantidad: DataTypes.INTEGER(11),
    ArticuloId:{
        type:DataTypes.INTEGER,
        field:"ArticuloId",
        references:{
            model:Articulo,
            key:"id"
        }
    },
    FacturaId:{
        type:DataTypes.INTEGER,
        field:"FacturaId",
        references:{
            model:Factura,
            key:"id"
        }
    }
}, { tableName: 'lineas', timestamps: false });

Linea.belongsTo(Factura);
Linea.belongsTo(Articulo)

router.get("/", (req,res) => {
    sequelize.sync().then(() => {
        Linea.findAll({ include:[Factura, Articulo]})
        .then(lineas => res.json({
            ok:true,
            data:lineas
        }))
        .catch(err => res.json({
            ok:false,
            error:err.message
        }))
    })
    .catch(err => res.json({
        a:"a",
        ok:false,
        error:err.message
    }))
})

router.get("/factura/:id", (req,res) => {
    const id = req.params.id
    sequelize.sync().then(() => {
        Linea.findAll({ where:{FacturaId:id}})
        .then(lineas => res.json({
            ok:true,
            data:lineas
        }))
        .catch(err => res.json({
            ok:false,
            error:err.message
        }))
    })
    .catch(err => res.json({
        a:"a",
        ok:false,
        error:err.message
    }))
})

router.post("/factura/:idf/articulo/:ida/:qtt", (req,res) => {
   const {idf, ida, qtt} = req.params;
    sequelize.sync().then(() => {
        Linea.create(req.body)
        .then(linea => res.json({
            ok:true,
            linea
        }))
    })
})


export default router;