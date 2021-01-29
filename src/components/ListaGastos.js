import React /* {useContext}  */from 'react'
// 1--Importamos {AuthContext} 
import {Helmet} from 'react-helmet'
import {Header, Titulo} from '../elements/Header'
import BtnBack from '../elements/BtnBack'
// 2--Importamos AuthContext
/* import {AuthContext} from '../contextos/AuthContext' */
import {useAuth} from '../contextos/AuthContext'
import BarraTotal from './BarraTotal'

//importamos hooks para obtener gastos
import useObtenerGastos from '../hooks/useObtenerGastos'
import {
    Lista,
    ElementoLista,
    ListaDeCategorias,
    ElementoListaCategorias,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from '../elements/ElementosListas'

import IconoCategoria from '../elements/IconCat'
import ConvertToCoin from '../funciones/ConvertToCoin'
import {ReactComponent as IconoEditar} from '../img/editar.svg'
import {ReactComponent as IconoBorrar} from '../img/borrar.svg'
import {Link} from 'react-router-dom'
import Boton from '../elements/Boton'
import {format, fromUnixTime} from 'date-fns'
import {es} from 'date-fns/locale'


const ListaGastos = () => {
  
  /*   // 3--Creamos const donde capturamos el contexto
  const contexto = useContext(AuthContext)
  // 4 --Console de contexto, nos debe devolver un objeto {Object} en consola
  console.log(contexto) */

//De una segunga manera, accedemos al contexto a traves de Hook personalizado
//que se llama useAuth

const {usuario} = useAuth()
console.log(usuario)


//Aca traemos los datos de funcion useObtenerGastos
//Corchetes para acceder por dentro 
const [gastos] = useObtenerGastos()

const formatearFecha = (fecha) =>{
  return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es}) 
   
}

const FechaEsIgual = (gastos, index, gasto) =>{
  if(index !== 0){
      const fechaActual = formatearFecha(gasto.fecha) 
      const fechaGastoAnterior =formatearFecha(gastos[index - 1].fecha) 
      if(fechaActual === fechaGastoAnterior){
        return true
      }else{
        return false
      }

  }
}

  return (
     <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>

      <Header>
         
            <BtnBack></BtnBack>
              <Titulo>Lista de gastos</Titulo>

      </Header>

      <Lista>
        {gastos.map((gasto , index)=>{
         /*  console.log(gasto.categoria) */
          return (

            < div key={gasto.id}>
              {!FechaEsIgual(gastos, index, gasto) && 
              <Fecha> {formatearFecha(gasto.fecha)} </Fecha>
              }
              
              <ElementoLista key={gasto.id} >
                  <Categoria >
                        <IconoCategoria  id={gasto.categoria}  />
                       {gasto.categoria}
                  </Categoria>

                  <Descripcion>
                    {gasto.descripcion}
                  </Descripcion>
                  <Valor>
                    {ConvertToCoin(gasto.cantidad)}
                  </Valor>
                  <ContenedorBotones>
                    <BotonAccion  as={Link} to={`/editar/${gasto.id}`}> 
                        <IconoEditar></IconoEditar>  
                     </BotonAccion>
                    <BotonAccion >
                        <IconoBorrar></IconoBorrar>
                       </BotonAccion>
                  </ContenedorBotones>
              </ElementoLista>

            </div>
          )
        })}

      <ContenedorBotonCentral>
          <BotonCargarMas>Cargar más</BotonCargarMas>
      </ContenedorBotonCentral>

        {gastos.length === 0 &&
            <ContenedorSubtitulo>
                  <Subtitulo>No hay gastos por mostrar</Subtitulo>
                  <Boton as={Link} to='/'>Agregar Gasto</Boton>
            </ContenedorSubtitulo>
        }

      </Lista>

      <BarraTotal/>

    </>
  )
}

export default ListaGastos
