import { useContext, useState } from "react";
import ContextUser from "../context/ContextUser"

/* 
    TODO crear ruta nou user
*/
export const CambiarUser = () => {
const {userId, setUserId} = useContext(ContextUser);
const [users, setUsers] = useState([]);
fetch("http://localhost:3000/clientes")
.then(res => res.json())
.then(data => setUsers(data.data))
function cambiarUser(id){
    const user = JSON.stringify({id:id})
    localStorage.setItem("userEcommerce", user)
    setUserId(id) 
}
  return (
    <div>
        <ul>
            {users.map(user => <li key={user.id}><button onClick={() => cambiarUser(user.id)}>{user.nombre} | {user.id}</button></li>)}
        </ul>
        <p>New User</p>
    </div>
  )
}
