import { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";

export const Articulo = () => {
    const parametros = useParams();
    const [articulo, setArticulo] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/articulos/${parametros.id}`)
        .then(res => res.json())
        .then(data => setArticulo(data.data))
        .catch(err => console.log(err))
    })

  return (
    <div>
        <h1 className="text-4xl">ARTICULO</h1>
        <p>{articulo.nombre}</p>
        <p>{articulo.descripcion}</p>
        <p>{articulo.precio}€</p>
        <p>Estoc: {articulo.estoc}</p>
    </div>
  )
}
