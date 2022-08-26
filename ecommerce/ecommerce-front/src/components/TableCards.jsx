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
    <div className="flex flex-row">
      <Sidebar/>
        <div style={{marginLeft:"18.1rem", marginTop:"4rem"}} className="py-9 flex flex-row flex-wrap justify-center gap-4">
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
  )
}
