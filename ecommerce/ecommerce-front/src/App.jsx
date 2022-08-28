import { Outlet } from "react-router-dom"
import ContextCesta from "./context/ContextCesta"
import ContextUser from "./context/ContextUser"
import {Navbar} from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { TableCards } from "./components/TableCards"
import { useState } from "react"

function App() {
  const [cesta, setCesta] = useState([])
  const [userId, setUserId] = useState(1);
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
