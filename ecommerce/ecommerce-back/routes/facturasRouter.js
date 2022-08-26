import express from "express";
import {DataTypes} from "sequelize";
import sequelize from "../loadSequelize.js";

const router = express.Router();

const Cliente = sequelize.define("Cliente", {
    email:DataTypes.STRING(150),
    nombre:DataTypes.STRING(150),
    direccion:DataTypes.STRING(150),
    poblacion:DataTypes.STRING(100),
    cpostal:DataTypes.STRING(10),
    password:DataTypes.STRING(150),
}, { tableName: 'clientes', timestamps: false })

const Factura = sequelize.define('Factura', {
    numero: DataTypes.STRING(15),
    fecha:DataTypes.DATE,
    direccion:DataTypes.STRING(150),
    poblacion:DataTypes.STRING(100),
    cpostal: DataTypes.STRING(10),
    nombre: DataTypes.STRING(150),
    ClienteId:{
        type: DataTypes.INTEGER,
        field:"ClienteId",
        references:{
            model:Cliente,
            key:"id"
        }
    }
}, { tableName: 'facturas', timestamps: false });

Factura.belongsTo(Cliente);

router.get("/", (req,res) => {
    sequelize.sync().then(() => {
        Factura.findAll()
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