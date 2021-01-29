import React /* {useContext}  */from 'react'
// 1--Importamos {AuthContext} 
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from '../elements/Header'
import BtnBack from '../elements/BtnBack'
// 2--Importamos AuthContext
/* import {AuthContext} from '../contextos/AuthContext' */
import {useAuth} from '../contextos/AuthContext'
import BarraTotal from './BarraTotal'


const ListaGastos = () => {
  
  /*   // 3--Creamos const donde capturamos el contexto
  const contexto = useContext(AuthContext)
  // 4 --Console de contexto, nos debe devolver un objeto {Object} en consola
  console.log(contexto) */

//De una segunga manera, accedemos al contexto a traves de Hook personalizado
//que se llama useAuth

const {usuario} = useAuth()
console.log(usuario)

  return (
     <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>

      <Header>
         
            <BtnBack></BtnBack>
              <Titulo>Lista de gastos</Titulo>
      



      </Header>
      <BarraTotal></BarraTotal>
    </>
  )
}

export default ListaGastos
