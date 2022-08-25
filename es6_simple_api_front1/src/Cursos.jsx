
import { useState, useEffect } from "react";


function Cursos() {
    const [nom, setNom] = useState("");
    const [dades, setDades] = useState([]);
    const [error, setError] = useState("");

    function loadData(){
        fetch("http://localhost:3000/api/cursos")
        .then(resultat => resultat.json())
        .then(objecte_retornat => {
            if (objecte_retornat.ok === true) {
                setDades(objecte_retornat.data);
            } else {
                setError(objecte_retornat.error)
            }
        })
        .catch(error => setError(error))
    }

    function elimina(id){
        console.log("em demanen que esborri el id "+id);

        fetch("http://localhost:3000/api/cursos/"+id,
        {
            method: "DELETE",
        })
        .then(res => loadData())
        .catch(err => console.log("error: ", err))
    }


    function desar(e){

        e.preventDefault();
        const al = {
            informacio: nom,
        }

        fetch("http://localhost:3000/api/cursos",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(al)
        })
        .then(res => {
            loadData()
            setNom("")})
        .catch(err => console.log("error: ", err))
    }

    useEffect(() => {

       loadData();

    }, [])


    if (error !== "") {
        return <h3>Error: {error.message} </h3>
    }

    if (dades.length === 0) {
        return <h3>No hi ha dades</h3>
    }

    const lis = dades.map(el => <li key={el.id}>{el.informacio}<button onClick={()=>elimina(el.id)}>X</button></li>);

    return (<>

        <h1>Cursos</h1>


        <hr />
        <form onSubmit={desar}>
            Nom: <input type="text" value={nom} onChange={(e)=>setNom(e.target.value)} />
            <br />
            <button type="submit">Desar</button>
        </form>

        <hr />
        <ul>
            {lis}
        </ul>
    </>)
}


export default Cursos;