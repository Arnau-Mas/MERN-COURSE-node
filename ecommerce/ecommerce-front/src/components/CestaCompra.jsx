import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import ContextCesta from "../context/ContextCesta"
import ContextUser from "../context/ContextUser"


export const CestaCompra = () => {
    const {cesta, setCesta} = useContext(ContextCesta);
    const {userId} = useContext(ContextUser);
    function pagarArticulo(){
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
  
  function eliminarArticulo(id){
    const indexArticulo = cesta.findIndex(articuloEncontrado => articuloEncontrado.id === id);
    console.log(indexArticulo);
    const newCesta = [...cesta];
    console.log(newCesta)
    newCesta.splice(indexArticulo, 1);
    console.log(newCesta)
    // ? perquè al context s'ha de fer [...newCesta] i no puc posar newCesta directament? 
    setCesta(newCesta)
  }

  function alterarCantidad(operacion, id){
    const cestaExistente = [...cesta];
    const indexArticle = cestaExistente.findIndex(articuloCesta => articuloCesta.id === id);
    if(operacion===1){
      cestaExistente[indexArticle].cantidad += 1
    }else{
      cestaExistente[indexArticle].cantidad -= 1
    }
    setCesta(prev => cestaExistente)
    }

    function addLinea(articulo, id){
      console.log("id", articulo.id)
      console.log("idFactura", id)
      fetch('http://localhost:3000/lineas', {
      method: "POST",
      body: JSON.stringify(	{
        cantidad:articulo.cantidad,
        FacturaId: id,
        ArticuloId:articulo.id
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err))
    }

    function pagarArticulo(){
      const date = new Date();
      console.log(ContextUser)
      fetch('http://localhost:3000/facturas', {
      method: "POST",
      body: JSON.stringify(	{
        fecha: `${date.getFullYear()}-${date.getMonth() < 10 ? `${0}${date.getMonth()}` : date.getMonth()}-${date.getMonth() < 10 ? `${0}${date.getDay()}` : date.getDay()}`,
        direccion: "C/Marquesa 3",
        poblacion: "Barcelona",
        cpostal: "08123",
        nombre: "Factura Y",
        ClienteId:userId
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => {
              if(json.ok===true){
                cesta.map(articulo => addLinea(articulo, json.data.id))
              }
            })
            .catch(err => console.log(err))
        }

  return (
    <div>
        <h1>CestaCompra</h1>
        {cesta.map(articulo => (
            <div key={articulo.id} className="bg-gray-300">
                <h3>{articulo.nombre}</h3>
                <div className="flex flex-row w-56 rounded-lg relative bg-transparent mt-1">
                <button onClick={() => alterarCantidad(-1, articulo.id)} data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-l cursor-pointer outline-none">
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <p className=" text-center w-8 bg-gray-300 font-semibold text-md md:text-basecursor-default flex items-center justify-center text-gray-700">{articulo.cantidad}</p>
              <button onClick={() => alterarCantidad(1, articulo.id)} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-r cursor-pointer">
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
                <button onClick={() => eliminarArticulo(articulo.id)} className="px-3 py-2 bg-red-700 text-white text-xs font-bold uppercase rounded">Eliminar</button>
            </div>
        ) )}
      <div className="pt-4 gap-2 flex">
            <button onClick={pagarArticulo} className="px-3 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded">Pagar</button>
            <button onClick={() => setCesta([])} className="px-3 py-2 bg-red-400 text-white text-xs font-bold uppercase rounded">Eliminar toda la cesta</button>
          </div>
    </div>
  )
}
