import { useContext } from "react"
import ContextCesta from "../context/ContextCesta"


export const CestaCompra = () => {
    const Cesta = useContext(ContextCesta);
  return (
    <div>
        <h1>CestaCompra</h1>
        {Cesta.cesta.map(articulo => (
            <div className="bg-gray-300">
                <h3>{articulo.nombre}</h3>
                <p>{articulo.cantidad}</p>
            </div>
        ) )}

    </div>
  )
}
