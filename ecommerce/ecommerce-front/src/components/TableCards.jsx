import { useState } from "react"
import { useEffect } from "react"
import { Card } from "./Card"
import { Sidebar } from "./Sidebar"
import {Link} from "react-router-dom";
import { useContext } from "react";
export const TableCards = () => {
  const [articulos, setArticulos] = useState([]);
  useEffect(() => {
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
        <div className="py-9 flex flex-col gap-4">
          <div>
            <Link to="/nuevoArticulo" className="px-3 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded">Nuevo artículo</Link>
          </div>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            {articulos.length===0 ? 
              <>
                  <Card articulo={{nombre:"aaaa", precio:"aaaa"}}/>
                  <Card articulo={{nombre:"aaaa", precio:"aaaa"}}/>
                  <Card articulo={{nombre:"aaaa", precio:"aaaa"}}/>
                  <Card articulo={{nombre:"aaaa", precio:"aaaa"}}/>
                  <Card articulo={{nombre:"aaaa", precio:"aaaa"}}/>
                  <Card articulo={{nombre:"aaaa", precio:"aaaa"}}/>
              </>
              :
              
              articulos.map(articulo => <Card key={articulo.id} articulo={articulo}/>)
              }
          </div>
        </div>
    </div>
  )
}
