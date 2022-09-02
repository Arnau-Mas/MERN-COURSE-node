import { useState } from "react"
import { useEffect } from "react"
import { Card } from "./Card"
import { Sidebar } from "./Sidebar"
import {Link} from "react-router-dom";
import { useContext } from "react";
export const TableCards = () => {
  const [articulos, setArticulos] = useState([]);
  useEffect(() => {
    console.log("aaa")
    fetch("http://localhost:3000/articulos")
    .then(res => res.json())
    .then(data => {
      data.ok===true && 
      setArticulos(data.data)
    })
    .catch(err => console.log(err))
  }, [])
  
  return (
    <div className="flex flex-row">
      {/* <Sidebar/> */}
        <div className="py-9 flex flex-col gap-4 w-10/12 justify-center align-middle items-center mx-auto">
            <div className="w-full">
              <Link to="/nuevoArticulo" className="px-3 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded">Nuevo artículo</Link>
            </div>
          <div className="flex flex-row flex-wrap gap-4">
            {articulos.length===0 ? 
              <>
                  <h1>No hay articulos</h1>
              </>
              :
              
              articulos.map(articulo => <Card key={articulo.id} articulo={articulo}/>)
              }
          </div>
        </div>
    </div>
  )
}
