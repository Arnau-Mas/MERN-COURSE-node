import { useState, useEffect } from 'react'

function App() {
  const [cita, setCita] = useState({})

  useEffect(() => {
    fetch("http://localhost:5000/citarandom")
      .then(res => res.json())
      .then(data => setCita(data))
  }, [])

  return (
    <div className="App">
      <img style={{height:"200px", width:"200px", objectFit:"cover"}} src={`http://localhost:5000/img/${cita.image}`} alt="" />
      <p>{cita.quote}</p>
      <p>{cita.author}</p>
    </div>
  )
}

export default App
