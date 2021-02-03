import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo } from '../elements/Header'
import BtnBack from '../elements/BtnBack'
import BarraTotal from './BarraTotal'
import useObtenerMesCat from '../hooks/useObtenerMesCat'
import { ListaDeCategorias, ElementoListaCategorias,Categoria, Valor }  from '../elements/ElementosListas'
import IconoCategoria from '../elements/IconCat'
import ConvertToJoin from '../funciones/ConvertToCoin'


const GastosCat = () => {
 const gastosPorCategoria = useObtenerMesCat() 
 console.log(gastosPorCategoria)
 

  return (
    <>
      <Helmet>
        <title>Categorías</title>
      </Helmet>

      <Header>
         
            <BtnBack></BtnBack>
              <Titulo>Gastos por Categoría</Titulo>
      
      </Header>


      <ListaDeCategorias>
            {
              gastosPorCategoria.map((elemento, index)=>{
                return (
                  <ElementoListaCategorias key={index}>
                    <Categoria>
                      <IconoCategoria id={elemento.categoria}></IconoCategoria>
                      {elemento.categoria}
                    </Categoria>
                    <Valor>
                      {ConvertToJoin(elemento.cantidad)}
                    </Valor>
                  </ElementoListaCategorias>
                )
              })
            }
      </ListaDeCategorias>
      
      <BarraTotal></BarraTotal>
    </>
  )
}

export default GastosCat
