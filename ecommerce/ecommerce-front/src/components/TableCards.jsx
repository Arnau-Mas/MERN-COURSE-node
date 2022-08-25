import { useState } from "react"
import { useEffect } from "react"
import { Card } from "./Card"
import { Sidebar } from "./Sidebar"

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
    <div className="flex flex-row gap-2">
        <Sidebar/>
        <div className="flex flex-row flex-wrap">
          {articulos.length===0 ? 
          <p>No articulos</p>
          :
          articulos.map(articulo => <Card key={articulo.id} articulo={articulo}/>)
          }
        </div>
    </div>
  )
}
