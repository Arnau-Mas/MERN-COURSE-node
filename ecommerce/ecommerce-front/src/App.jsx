import { Outlet } from "react-router-dom"
import ContextCesta from "./context/ContextCesta"
import ContextUser from "./context/ContextUser"
import {Navbar} from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { TableCards } from "./components/TableCards"
import { useState } from "react"

function App() {
  let userLocal = localStorage.getItem('userEcommerce');
  if(!userLocal){
    userLocal = {
      id:1
    };
  }else{
    userLocal = JSON.parse(userLocal)
  }
  const [cesta, setCesta] = useState([])
  const [userId, setUserId] = useState(userLocal.id);
  return (
    <ContextUser.Provider value={{userId, setUserId}}>
    <ContextCesta.Provider value={{cesta, setCesta}} >
    <div className="bg-gray-200 relative h-screen">
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
    </ContextCesta.Provider>
    </ContextUser.Provider>
  )
}

export default App
