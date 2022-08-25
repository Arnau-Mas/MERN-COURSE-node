//importamos/requerimos express y controladores
import express from "express";
import cors from "cors";
import alumnesRouter from './rutas/alumnesRouter.js';
import indexRouter from './rutas/indexRouter.js';
import professorsRouter from "./rutas/professorsRouter.js";
import cursosRouter from "./rutas/cursosRouter.js";
import edicionsRouter from "./rutas/edicionsRouter.js";

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json del post i no se si altres
app.use(express.json());
app.use(cors());

//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/', indexRouter);
app.use('/api/alumnes', alumnesRouter); //no fa falta en el alumnesrouter configurar el /api/alumnes pq ja fa matching aqui, al router fiques tota la resta de /api/alumnes/***** el **** es el q has de posar al router
app.use('/api/professors', professorsRouter);
app.use('/api/cursos', cursosRouter);
app.use('/api/edicions', edicionsRouter);

//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))
