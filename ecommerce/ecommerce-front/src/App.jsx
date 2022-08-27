import { Outlet } from "react-router-dom"
import {Navbar} from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { TableCards } from "./components/TableCards"

function App() {

  return (
    <div className="bg-gray-200 relative h-screen">
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
