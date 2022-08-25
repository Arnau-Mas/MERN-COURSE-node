import {Navbar} from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { TableCards } from "./components/TableCards"

function App() {

  return (
    <div className="bg-gray-200">
      <Navbar/>
      <TableCards/>
    </div>
  )
}

export default App
