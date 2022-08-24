import express from "express"; 
import sqz from "../database/loadSequelize.js";
import {DataTypes} from "sequelize"
const router = express.Router();

const Contacte = sqz.define('Contacte', {
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    telephone:DataTypes.INTEGER,
    age:DataTypes.INTEGER
}, { tableName: 'contactes', timestamps: false });

router.get("/", (req,res) => {
    sqz.sync().then(() => { 
        Contacte.findAll()
            .then(contactes =>{
                res.json({ 
                    ok: true,
                    data: contactes
                })
            }
            )
            .catch(error => {
                console.log("********+error")
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
})
export default router;