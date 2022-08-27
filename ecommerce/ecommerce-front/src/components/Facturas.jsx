import { useState } from "react"
import { useEffect } from "react"

export const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/facturas")
        .then(res => res.json())
        .then(data => {
            setFacturas(data.data)
        })
    }, [])
  return (
    <div className="h-screen">
        <h1 className="text-4xl">FACTURAS</h1>
        {facturas.map(factura => {
            return (
                <div className="bg-gray-500 mb-2">
                    <p>{factura.numero}</p>
                    <p>{factura.fecha}</p>
                    <p>{factura.direccion}</p>
                    <p>{factura.poblacion}</p>
                    <p>{factura.cpostal}</p>
                    <p>{factura.nombre}</p>
                </div>
            )
        })}
        
    </div>
  )
}
