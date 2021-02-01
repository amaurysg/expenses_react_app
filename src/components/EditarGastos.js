import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo } from '../elements/Header'
import BtnBack from '../elements/BtnBack'
import BarraTotal from './BarraTotal'
import FormGastos from './FormGastos'
//UseParams para acceder a parametros de las urls, hashs
import {useParams} from 'react-router-dom'

import useObtenerGasto from '../hooks/useObtenerGasto'

const EditarGastos = () => {
  //Extraemos el id, el id esta definido por la ruta /editar/:id
  //La cual definimos antes en el la logica de las rutas
  const {id} = useParams()
  //Llamos a Hooks obtenerGasto
  const [gasto] = useObtenerGasto(id)




  return (
<>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <Header>
         
            <BtnBack ruta="/lista"></BtnBack>
              <Titulo>Editar Gasto</Titulo>
      



      </Header>
      {/* Agregamos el estado gasto al formulario para llamarlo */}
      <FormGastos gasto={gasto}></FormGastos>
      
      <BarraTotal></BarraTotal>
    </>
  )
}

export default EditarGastos
