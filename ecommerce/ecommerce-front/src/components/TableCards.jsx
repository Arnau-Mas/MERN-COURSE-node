import { useState } from "react"
import { useEffect } from "react"
import { EditableCard } from "./EditableCard"
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
      <Sidebar/>
        <div style={{width:"93.8%"}} className="ml-80 mt-16 py-9 flex flex-col gap-4 w-11/12 justify-center align-middle items-center mx-auto">
          <div className="flex flex-row flex-wrap gap-4 mx-auto justify-center">
            {articulos.length===0 ? 
              <>
                  <h1>No hay articulos</h1>
              </>
              :
              
              articulos.map(articulo => <EditableCard key={articulo.id} articulo={articulo}/>)
              }
          </div>
        </div>
    </div>
  )
}
