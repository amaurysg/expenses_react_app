import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo } from '../elements/Header'
import BtnBack from '../elements/BtnBack'
import BarraTotal from './BarraTotal'

const GastosCat = () => {
  return (
    <>
      <Helmet>
        <title>Categorías</title>
      </Helmet>

      <Header>
         
            <BtnBack></BtnBack>
              <Titulo>Gastos por Categorías</Titulo>
      



      </Header>
      <BarraTotal></BarraTotal>
    </>
  )
}

export default GastosCat
