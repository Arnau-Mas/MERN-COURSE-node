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


router.get("/:id", (req,res) => {
    const id = req.params.id;
    sequelize.sync().then(() => { 
        Cliente.findOne({where: {id}})
            .then(cliente =>{
                res.json({ 
                    ok: true,
                    data: cliente
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
    
    sequelize.sync().then(async () => {
        /* Cliente.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error })) */
        try {
            const cliente = await Cliente.create(req.body)
            console.log(cliente)
        return res.json({
            ok:true,
            data:cliente
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
            descripcion,
            poblacion,
            cpostal,
            password
        }
        //busquem l'alumne en qüestió
        Cliente.findOne({ where: { idarticulos: req.params.id } })
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
        Cliente.destroy({ where: { idarticulos: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error:error.message }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

export default router;