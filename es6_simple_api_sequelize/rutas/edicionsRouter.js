import express from "express";
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";

const router = express.Router();

const Edicio = sequelize.define('Edicio', {
    titol: DataTypes.STRING,
    datainici:DataTypes.DATE
}, { tableName: 'edicions', timestamps: false });


router.get('/', function (req, res, next) {

    sequelize.sync().then(() => { 
        Edicio.findAll()
            .then(edicions => res.json({ 
                ok: true,
                data: edicions
            }))
            .catch(error => res.json({
                ok: false,
                error: error.message
            }))
    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });

});

router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Edicio.findOne({ where: { id: req.params.id } })
            .then(edicio => res.json({
                ok: true,
                data: edicio
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Edicio.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Edicio.findOne({ where: { id: req.params.id } })
            .then((edicio_trobada) =>
                edicio_trobada.update(req.body)
            )
            .then((edicio_creada) => res.json({
                ok: true,
                data: edicio_creada
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

router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {
        Edicio.destroy({ where: { id: req.params.id } })
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