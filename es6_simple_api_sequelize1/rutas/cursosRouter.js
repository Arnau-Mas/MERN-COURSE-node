import express from "express";
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";

const Curs = sequelize.define('Curs', {
    informacio: DataTypes.STRING
}, { tableName: 'cursos', timestamps: false });

const router = express.Router();

router.get('/', function (req, res, next) {

    sequelize.sync().then(() => { 
        Curs.findAll()
            .then(cursos => res.json({ 
                ok: true,
                data: cursos
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

router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Curs.create(req.body)
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
        Curs.findOne({ where: { id: req.params.id } })
            .then((curs_trobat) =>
                curs_trobat.update(req.body)
            )
            .then((curs_creat) => res.json({
                ok: true,
                data: curs_creat
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
        Curs.destroy({ where: { id: req.params.id } })
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