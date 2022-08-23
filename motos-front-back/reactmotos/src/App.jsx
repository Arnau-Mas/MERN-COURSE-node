import { useEffect, useState } from 'react'
function App() {
  const [motos, setMotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/motos")
    .then(res => res.json()) //les dades de json les passem a objecte
    .then(data => setTimeout(() => {
      setMotos(data)
    }, 2000))
    .catch(error => console.log(error))
  }, [])
  
  return (
    <>
      <h1>React Motos</h1>
        {motos.length===0 ? 
          <p style={{fontSize:"2rem"}}>Cargando... 😉</p>
          :
          motos.map(moto => <p key={Math.floor(Math.random()*9999999)}>{moto.marca} {moto.model}</p>)
        }
    </>
  )
}

export default App
