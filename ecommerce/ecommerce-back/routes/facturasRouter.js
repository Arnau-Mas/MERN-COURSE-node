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


const Cliente = sequelize.define("Cliente", {
    email:DataTypes.STRING(150),
    nombre:DataTypes.STRING(150),
    direccion:DataTypes.STRING(150),
    poblacion:DataTypes.STRING(100),
    cpostal:DataTypes.STRING(10),
    password:DataTypes.STRING(150),
}, { tableName: 'clientes', timestamps: false })

const Factura = sequelize.define('Factura', {
    fecha:DataTypes.DATE,
    direccion:DataTypes.STRING(150),
    poblacion:DataTypes.STRING(100),
    cpostal: DataTypes.STRING(10),
    nombre: DataTypes.STRING(150),
    ClienteId:{
        type:DataTypes.INTEGER,
        field:"ClienteId",
        references:{
            model:Cliente,
            key:"id"
        }
    }
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


Factura.belongsToMany(Articulo,  {through: Linea, foreignKey:"FacturaId"});
Articulo.belongsToMany(Factura, {through: Linea, foreignKey:"ArticuloId"})
Factura.belongsTo(Cliente)

router.get("/", (req,res) => {
    sequelize.sync().then(() => {
        Factura.findAll({ include:[Cliente, Articulo] })
            .then(facturas => res.json({
                ok:true,
                data:facturas
            }))
            .catch(err => res.json({
                ok:false,
                error:err.message
            }))
        .catch(err => res.json({
            ok:false,
            error:err.message
        }))
    })
})

router.get("/cliente/:id", (req,res) => {
    const id = req.params.id;
    sequelize.sync().then(() => {
        Factura.findAll({include:[Cliente, Articulo], where:{ClienteId:id}})
            .then(facturas => res.json({
                ok:true,
                data:facturas
            }))
            .catch(err => res.json({
                ok:false,
                error:err.message
            }))
        .catch(err => res.json({
            ok:false,
            error:err.message
        }))
    })
})

router.post('/', (req, res) => {
    
    sequelize.sync().then(async () => {
        try {
            const factura = await Factura.create(req.body)
        return res.json({
            ok:true,
            data:factura
        })
        } catch (error) {
            return res.json({
                ok:false,
                data:error.message
            })
        }
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        const {email, nombre, direccion, poblacion, cpostal, password} = req.body;
        const newCliente = {
            email,
            nombre,
            direccion,
            poblacion,
            cpostal,
            password
        }
        console.log(newCliente)

        Cliente.findOne({ where: { id: req.params.id } })
            .then((cliente) =>
                cliente.update(newCliente)
            )
            .then((clienteRes) => res.json({
                ok: true,
                data: clienteRes
            }))
            .catch(error => res.json({
                ok: false,
                error: error.message
            }));
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

router.delete('/:id', function (req, res) {
    sequelize.sync().then(() => {
        let clienteToDelete = {};
        Cliente.findOne({ where: { id: req.params.id } })
            .then(cliente => clienteToDelete = cliente)
            .then(
                Cliente.destroy({ where: { id: req.params.id } })
                .then((data) => res.json({ ok: true, data, itemDeleted: clienteToDelete }))
                .catch((error) => res.json({ ok: false, error:error.message }))
            )

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

export default router;