import express from "express";
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";

const Professor = sequelize.define('Professor', {
    nom: DataTypes.STRING
}, { tableName: 'professors', timestamps: false });

const router = express.Router();

router.get('/', function (req, res, next) {

    sequelize.sync().then(() => { 
        Professor.findAll()
            .then(professors => res.json({ 
                ok: true,
                data: professors
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
        Professor.findOne({ where: { id: req.params.id } })
            .then(Professor => res.json({
                ok: true,
                data: Professor
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
        Professor.create(req.body)
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
        Professor.findOne({ where: { id: req.params.id } })
            .then((professor_trobat) =>
                professor_trobat.update(req.body)
            )
            .then((professor_creat) => res.json({
                ok: true,
                data: professor_creat
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
        Professor.destroy({ where: { id: req.params.id } })
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