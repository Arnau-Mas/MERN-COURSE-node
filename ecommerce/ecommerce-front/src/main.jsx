import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { TableCards } from './components/TableCards'
import { NewArticle } from './components/newArticle'
import { Facturas } from './components/Facturas'
import { Articulo } from './components/Articulo'
import { CestaCompra } from './components/CestaCompra'
import { CambiarUser } from './components/CambiarUser'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<TableCards/>}/>
          <Route path="/nuevoArticulo" element={<NewArticle/>}/>
          <Route path="/facturas" element={<Facturas/>}/>
          <Route path="/articulo/:id" element={<Articulo/>}/>
          <Route path="/cesta" element={<CestaCompra/>}/>
          <Route path="/cambiarUser" element={<CambiarUser/>}/>
        </Route>    
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
