import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './elements/Header'
import Boton from './elements/Boton'
import BtnClosedSesion from './elements/BtnClosedSesion'
import FormGastos from './components/FormGastos'
import BarraTotal from './components/BarraTotal'

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
          <ContenedorHeader>
              <Titulo>Agregar Gastos</Titulo>
              <ContenedorBotones>
                  <Boton to="/categorias">Categorías</Boton>
                  <Boton to="/lista">Lista de Gastos</Boton>
                  <BtnClosedSesion/>
               
                

              </ContenedorBotones>

          </ContenedorHeader>

      </Header>

      <FormGastos>
        
      </FormGastos>

      <BarraTotal></BarraTotal>

    </>

  )
}

export default App
