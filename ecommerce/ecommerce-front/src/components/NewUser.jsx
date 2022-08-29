import { useState } from "react"

export const NewUser = () => {
    const [added, setAdded] = useState(false)
    const [user, setUser] = useState({
        email:"",
        nombre:"",
        direccion:"",
        poblacion:"",
        cpostal:"",
        password:""
    })

    function handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/clientes', {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => json.ok===true ? setAdded(true) : setError("Ha habido algún error"))
      .catch(err => setError(err))
    }
  return (
    <div className="p-10 flex flex-col">
       <form onSubmit={handleSubmit}>
       <label htmlFor="nombre">Nombre</label>
        <input value={user.nombre}  onChange={(e) => setUser({...user, nombre:e.target.value})} type="text" name="nombre" id="nombre" />
        <label htmlFor="email">Email</label>
        <input value={user.email}  onChange={(e) => setUser({...user, email:e.target.value})} type="email" name="email" id="email" />
        <label htmlFor="direccion">Direccion</label>
        <input  value={user.direccion} onChange={(e) => setUser({...user, direccion:e.target.value})} type="text" name="direccion" id="direccion" />
        <label htmlFor="poblacion">Poblacion</label>
        <input value={user.poblacion} onChange={(e) => setUser({...user, poblacion:e.target.value})} type="text" name="poblacion" id="poblacion" />
        <label htmlFor="cpostal">C Postal</label>
        <input value={user.cpostal} onChange={(e) => setUser({...user, cpostal:e.target.value})} type="text" name="cpostal" id="cpostal" />
        <label htmlFor="password">Password</label>
        <input value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} type="password" name="password" id="password" />
        <button type="submit">Crear</button>
       </form>
       {
        added && <p>Añadido!</p>
       }
    </div>
  )
}
