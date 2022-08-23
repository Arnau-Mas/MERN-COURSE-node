import { useState, useEffect } from 'react'

function App() {
  const [cita, setCita] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/citarandom")
      .then(res => res.json())
      .then(data => setCita(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <img style={{height:"400px", width:"400px", objectFit:"cover", position:"relative"}} src={`http://localhost:5000/img/${cita.image}`} alt="" />
      <div style={{position:"absolute", bottom:"6rem", color:"white", width:"15rem", backgroundColor:"rgba(0,0,0,0.5)", display:"flex", flexDirection:"column", justifyContent:"center", paddingLeft:"0.8rem"}}>
      <p>{cita.quote}</p>
      <p>{cita.author}</p>
      </div>
    </div>
  )
}

export default App
