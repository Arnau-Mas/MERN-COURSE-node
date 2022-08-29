import { useState } from "react"
import { useEffect } from "react"
import ContextUser from '../context/ContextUser.jsx'
import { useContext } from "react"
export const Facturas = () => {
    const {userId} = useContext(ContextUser);
    const [facturas, setFacturas] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/facturas/cliente/${userId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFacturas(data.data)
        })
    }, [])
  return (
    <div className="h-screen">
        <h1 className="text-4xl">FACTURAS</h1>
        {facturas.map(factura => {
            console.log(factura)
            return (
                <div key={factura.id} className="bg-gray-300 mb-2">
                    <p>{factura.id}</p>
                    <p>{factura.fecha}</p>
                    <p>{factura.direccion}</p>
                    <p>{factura.poblacion}</p>
                    <p>{factura.cpostal}</p>
                    <p>{factura.nombre}</p>
                    <p>Articulos:</p>
                    {factura.Articulos.map(articulo => (
                        <div key={articulo.id}>
                            <p>{articulo.nombre}</p>
                            <p>{articulo.Linea.cantidad}</p>
                        </div>
                    ))}
                </div>
            )
        })}
        
    </div>
  )
}
