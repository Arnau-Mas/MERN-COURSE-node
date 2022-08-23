// importem llibreries utilitzades
import express from 'express';
import cors from 'cors';

// carreguem array de motos definit a motos.js
import MOTOS from './motos.js';

// definim port on e'executarà el servidor
const PORT = 5000;

// creem express app
const app = express();

// activem cors per no tenir problemes des del front
app.use(cors());

// definim public com a ruta per axius estàtics
app.use(express.static('public')) //carpeta accessible al servidor de la API sense endpoints, tu pots posar localhost:5000/img/aprilia.png i et retorna la imatge sense necessitat de crear el app.get("/img/aprilia.png") perque els recursos estatics els agafa x defecte si no hi ha endpoint configurat

// ruta /motos retorna tota la llista
app.get('/motos', function (req, res) {
    res.json(MOTOS)
})

// ruta /motos/honda retorna només les honda
app.get('/motos/:marca', function (req, res) {
    let marca_buscada = req.params.marca;
    let motos_marca = MOTOS.filter(e => e.marca.toUpperCase() == marca_buscada.toUpperCase())
    res.json(motos_marca)
})



// iniciem el servidor al port indicat
app.listen(PORT, function () {
    console.log('Escoltant port ' + PORT)
})
