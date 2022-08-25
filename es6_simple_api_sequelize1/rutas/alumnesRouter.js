import express from 'express';
import { DataTypes } from "sequelize";


//no tanques la connexio?
//

//importem l'objecte sequelize de loadSequelize
import sequelize from "../loadSequelize.js";

//DEFINICION DEL MODELO
//per cada taula de la db tenim un model, que tindrà la mateixa estructura q la columna
const Alumne = sequelize.define('Alumne', {
    //no fa falta definir l'id
    nom: DataTypes.STRING //Definim els tipus amb DataTyles.elQueSigui (datatypes esta importat a dalt) //aixo ha de quadrar sempre amb els parametres de la columna, sino, no fara bé la cerca
}, { tableName: 'alumnes', timestamps: false }); //si no posem timestamp ens donaria un error pq contempla q a la ddbb hih a columna createdAt 
//no fa falta posar el nom de la taula perquè agafa el "Alumne" i li afegeix una s. Però sempre és millor posar-lo perquè hi ha prurals que no encaixarien afegint-hi una s només. Per exemple curs -> curss no posaria cursos
//PER SABER EL TIPUS DE DADES DE DATATYPES ANEM A LA INFO DE SEQUELIZE QUE TE UNA TAULA COMPARATIVA DELS TIPUS DE DADES DE SQL I MIRAR AL MEU SCHEMA QUIN TIPUS DE DADA VAM ESCOLLIR
// ES PODEN COMPARAR AQUI https://sequelize.org/docs/v7/other-topics/other-data-types/



const router = express.Router();

// GET lista de todos los alumnes
// vinculamos la ruta /api/alumnes a la función declarada
// si todo ok devolveremos un objeto tipo:
//     {ok: true, data: [lista_de_objetos_alumne...]}
// si se produce un error:
//     {ok: false, error: mensaje_de_error}

router.get('/', function (req, res, next) {

    sequelize.sync().then(() => { //connecta amb la base de dades i li envia per callback una ordre
        //La ordre és, importa TOTS els alumnes
        Alumne.findAll()
            .then(alumnes => res.json({ //quan els tinguis, retorna un objecte amb els alumnes
                ok: true,
                data: alumnes
            }))
            .catch(error => res.json({ //si hi ha un error, envia l'error
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

// GET de un solo alumne
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Alumne.findOne({ where: { id: req.params.id } })
            // .then(Alumne => Alumne.get({plain: true}))
            .then(Alumne => res.json({
                ok: true,
                data: Alumne
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



// POST, creació d'un nou alumne
router.post('/', function (req, res, next) {
    //puc fer les comprovacions del req.body aqui i construir aqui l'objeecte abans de passar-li a create directament el req.body, fer if(req.body.name!=null etc) { el let alumne { nom : req.body.nom}} ¿i fer també la cerca abans de si existeix el mail duplicat (who knows)?
    sequelize.sync().then(() => {
        Alumne.create(req.body)
            .then((item) => res.json({ ok: true, data: item })) //enviem l'item pq és el q ens retorna la base de dades amb l'ID
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});


// put modificació d'un alumne
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        //busquem l'alumne en qüestió
        Alumne.findOne({ where: { id: req.params.id } })
            .then((alumne_trobat) =>
                alumne_trobat.update(req.body)
            )
            .then((alumne_creatYretornat) => res.json({
                ok: true,
                data: alumne_creatYretornat
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



// DELETE elimina l'alumne id
router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {
        Alumne.destroy({ where: { id: req.params.id } })
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
