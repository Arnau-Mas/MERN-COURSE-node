import { useState } from "react"
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Sidebar } from "./Sidebar"

export const NewArticle = () => {
  const [articulo, setArticulo] = useState({nombre:"", descripcion:"", precio:"", estoc:""});
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/articulos', {
      method: "POST",
      body: JSON.stringify(articulo),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => json.ok===true ? setAdded(true) : setError("Ha habido algún error"))
      .catch(err => setError(err))
    }
  return (
    <div className="flex flex-row h-screen">
{/*     <Sidebar/> */}
      <div style={{marginLeft:"18.1rem", marginTop:"4rem"}} className="py-9 flex flex-col gap-4">
        {
          added === false ? 
          <>
          <form onSubmit={handleSubmit} className="flex flex-col ml-10">
          <label htmlFor="nombreArticulo">Nombre del artículo:</label>
          <input onChange={(e) => setArticulo(prev => setArticulo({...prev, nombre:e.target.value}))} type="text" name="" id="nombreArticulo" />
          <label htmlFor="descripcionArticulo">Descripción:</label>
          <input onChange={(e) => setArticulo(prev => setArticulo({...prev, descripcion:e.target.value}))} type="text" name="" id="descripcionArticulo" />
          <label htmlFor="precioArticulo">Precio:</label>
          <input onChange={(e) => setArticulo(prev => setArticulo({...prev, precio:e.target.value}))} type="number" name="" id="precioArticulo" />
          <label htmlFor="estocArticulo">Estoc:</label>
          <input type="number" name="" id="estocArticulo" />
          <button onChange={(e) => setArticulo(prev => setArticulo({...prev, estoc:e.target.value}))} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" type="submit">Agregar</button>
        </form>
        </>
        :
        <>
        <h3>Artículo añadido!</h3>
        <Card articulo={articulo} />
        <Link to="/"  className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Volver a artículos</Link>
        </>
        }
      </div>
  </div>
  )
}