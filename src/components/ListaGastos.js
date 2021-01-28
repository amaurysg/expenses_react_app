import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from '../elements/Header'
import BtnBack from '../elements/BtnBack'

const ListaGastos = () => {
  return (
     <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>

      <Header>
         
            <BtnBack></BtnBack>
              <Titulo>Lista de gastos</Titulo>
      



      </Header>

    </>
  )
}

export default ListaGastos
