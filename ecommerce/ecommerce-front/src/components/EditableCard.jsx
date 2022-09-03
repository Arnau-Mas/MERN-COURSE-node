import { Link } from "react-router-dom";
import { useContext } from "react"
import ContextCesta from "../context/ContextCesta"
import { useState } from "react";
import { PencilAltIcon, XCircleIcon } from '@heroicons/react/outline'

export const EditableCard = ({ articulo, admin=true }) => {
  const [cantidad, setCantidad] = useState(1);
  const Cesta = useContext(ContextCesta);
  function addCesta(){
    const cestaExistente = Cesta.cesta;
    const indexArticle = cestaExistente.findIndex(articuloCesta => articuloCesta.id === articulo.id);
    if(cestaExistente.length===0){
        console.log("primer if")
        Cesta.setCesta(prev => [...prev,{...articulo, cantidad:cantidad}]);
        console.log(cestaExistente)
        setCantidad(1)
        return;
      }
      if(indexArticle===-1){
        console.log("segon if")
        Cesta.setCesta(prev => [...prev, {...articulo, cantidad:cantidad}])
        console.log(cestaExistente)
        setCantidad(1)
        return;
      }
      if(indexArticle!=-1){
        console.log("tercer if")
        cestaExistente[indexArticle].cantidad += cantidad
        console.log(cestaExistente)
        Cesta.setCesta(prev => [...cestaExistente])
        setCantidad(1)
        return;
      }
    }

    function deleteArticle(){

    }
    return (
        <div className="flex max-w-sm min-w-sm bg-white shadow-lg rounded-lg overflow-hidden relative">
          <div className="absolute right-4 flex gap-2 top-4 cursor-pointer ">
            <Link to="/editaArticlo"><PencilAltIcon className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer"/></Link>
            <XCircleIcon onClick={deleteArticle} className="h-6 w-6 hover:text-red-700 text-red-500 "/>
          </div>
          <div className="w-32 bg-cover" style={{backgroundImage: "url('https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sfrm=jpg')"}}>
          </div> 
          <div className="w-64 p-4">
          <div>
            <h1 className="text-gray-900 font-bold text-2xl h-8">{articulo.nombre}</h1>
            <p className="mt-2 text-gray-600 text-sm w-54 overflow-hidden h-10">{articulo.descripcion}</p>
            <div className="flex item-center justify-between mt-3">
            <p className="text-gray-700 w-44 text-left font-bold text-xl overflow-hidden">{articulo.precio}€</p>
            </div>
            </div>
            {/* aaaa */}
            <div className="flex item-center justify-between mt-3">
              <div className="flex flex-row w-56 rounded-lg relative bg-transparent mt-1">
                <button onClick={() => cantidad===1 ? 1 : setCantidad(prev => Number(prev-1))} data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-l cursor-pointer outline-none">
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <p className=" text-center w-8 bg-gray-300 font-semibold text-md md:text-basecursor-default flex items-center justify-center text-gray-700">{cantidad}</p>
              <button onClick={() => setCantidad(prev => Number(prev+1))} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-r cursor-pointer">
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
              <button onClick={addCesta} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase w-28 rounded">Añadir</button>
            </div>
          </div>
        </div>
    );
};
