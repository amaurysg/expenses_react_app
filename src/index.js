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
import {Helmet} from 'react-helmet'
import favicon from './img/logo.png'
import Fondo from './elements/Fondo'
import {AuthContext, AuthProvider} from './contextos/AuthContext'
import PrivateRoutes from './components/PrivateRoutes'



/* WebFont.load({
    google: {
      families: ['Work Sans: 400, 500, 700', 'sans-serif']
    }
  }); */



const Index = () =>{
  return (

  <>
    <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
        <title>Expenses App</title>

    </Helmet>
    {/* Con AuthProvider inyectamos todo el contexto global a nuestra App, ahora tenemos que acceder a los estados. */}
    <AuthProvider>
      <BrowserRouter>
        <Contenedor>
            <Switch>
              {/* //Aqui iran todas las rutas */}
              <Route  path="/iniciar-sesion" component={InicioSesion} />
              <Route  path="/crear-cuenta" component={RegistroUser} />
              
              <PrivateRoutes path="/categorias">
                <GastosCat></GastosCat>
              </PrivateRoutes>

              <PrivateRoutes path="/lista">
                <ListaGastos></ListaGastos>
              </PrivateRoutes>

              <PrivateRoutes path="/editar/:id">
                <EditarGastos></EditarGastos>
              </PrivateRoutes>

              <PrivateRoutes path="/">
                <App></App>
              </PrivateRoutes>

{/*           <Route  path="/categorias" component={GastosCat} />
              <Route  path="/lista" component={ListaGastos} />
              <Route  path="/editar/:id" component={EditarGastos} />
              <Route  path="/" component={App} /> */}
      
            </Switch>
        
       </Contenedor>
      
      </BrowserRouter>
    </AuthProvider>

    <Fondo></Fondo>
    
  </>

  )
}

ReactDOM.render( <Index/> , document.getElementById('root'))



