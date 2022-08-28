import { useContext } from "react"
import { Link } from "react-router-dom";
import ContextCesta from "../context/ContextCesta"
import ContextUser from "../context/ContextUser"


export const CestaCompra = () => {
    const Cesta = useContext(ContextCesta);

    function pagar(){
      /* 
      TODO Configurar el fetch a lineas o a facturas o als dos? 
      ? S'ha de fer fetch amb la cistella de la compra? Pq no tenim taula de cistella
       */
/*       const factura = {
          numero: "054103",
          fecha: "2022-08-26",
          direccion: "C/Marquesa 3",
          poblacion: "Barcelona",
          cpostal: "08123",
          nombre: "Factura Y",
          ClienteId:ContextUser.userId
      }
      fetch('http://localhost:3000/facturas', {
        method: "POST",
        body: JSON.stringify(factura),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => json.ok===true ? setAdded(true) : setError("Ha habido algún error"))
        .catch(err => setError(err))
    } */
  }
  return (
    <div>
        <h1>CestaCompra</h1>
        {Cesta.cesta.map(articulo => (
            <div className="bg-gray-300">
                <h3>{articulo.nombre}</h3>
                <p>{articulo.cantidad}</p>
            </div>
        ) )}
      <div>
            <button onClick={pagar} className="px-3 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded">Pagar</button>
          </div>
    </div>
  )
}
