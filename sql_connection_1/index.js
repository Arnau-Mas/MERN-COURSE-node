import mysql from "mysql";
import express from "express";
import cors from "cors";

//ordre que ens permet crear la conexio amb la base de dades i assignar l'objecte connexio a una variable. Per parametre li passem les dades de la conexió.
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "vgames"
});

//Utilitzem el metode connect per connectar-nos a la base de dades. Li passem un callback que s'executa al acabar la conexió, el configurem x rebre errors, però tb es podria fer un con.connect() sense callback, però s'ha de fer amb l'error per manejar els errors.
con.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection Established');
})


let genres=[];

//un cop connectats a la ddbb, podem enviar-li querys
con.query("select * from genres", 

    (err, res, fields) => {
        if (err) console.log(err.sqlMessage);
        else {
            res.forEach(element => { //res són tots els valors importats
                console.log(element.genre); //aqui fem un forEach però podriem fer un dades = res
            });
            fields.forEach(element => { //columnes sql de la resposta, x si hem d'explorar
                console.log("camp", element.name)
            });
        }
    })
con.end(function (err) { //tanquem connexio cada vegada que ja no s'hagi d'utilitzar la ddbb. 
    if(err) console.log(err);
});