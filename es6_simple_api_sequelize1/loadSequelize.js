import config from './config/config.js'
import { Sequelize } from "sequelize";

//agafa les dades del config
//crea l'objecte sequelize (el mateix q crear lobjecte sql.createConection) i l'exportem

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

export default sequelize;