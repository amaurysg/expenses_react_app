import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader'
import Contenedor from './elements/Contenedor'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import EditarGastos from './components/EditarGastos'
import GastosCat from './components/GastosCat'
import InicioSesion from './components/InicioSesion'
import ListaGastos from './components/ListaGastos'
import RegistroUser from './components/RegistroUser'



WebFont.load({
    google: {
      families: ['Work Sans: 400, 500, 700', 'sans-serif']
    }
  });



const Index = () =>{
  return (
    <BrowserRouter>
      <Contenedor>
          <Switch>
            {/* //Aqui iran todas las rutas */}
            <Route  path="/iniciar-sesion" component={InicioSesion} />
            <Route  path="/crear-cuenta" component={RegistroUser} />
            <Route  path="/categorias" component={GastosCat} />
            <Route  path="/lista" component={ListaGastos} />
            <Route  path="/editar/:id" component={EditarGastos} />
            <Route  path="/" component={App} />

          </Switch>
      
     </Contenedor>
    
    </BrowserRouter>
  )
}

ReactDOM.render( <Index/> , document.getElementById('root'))



