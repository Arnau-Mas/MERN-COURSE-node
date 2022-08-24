import config from '../config/config.js'
import { Sequelize } from "sequelize";

const sqz = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

export default sqz;