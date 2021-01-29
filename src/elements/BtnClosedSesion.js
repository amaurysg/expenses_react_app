import React from 'react'
import {ReactComponent as IconoCerrarSesion} from '../img/log-out.svg'
import Boton from './Boton'
import {auth} from '../firebase/firebaseConfig'
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert'


const BtnClosedSesion = () => {
  const history = useHistory()

  const closedSesion = async () =>{
    try{
       await auth.signOut()
      swal("Cerraste Sesión","Pulsa Ok para salir","info")
      history.push('/iniciar-sesion')
    }catch(error){
      console.log(error)
    }
  }

  return (
      <Boton iconoGrande as="button" onClick={closedSesion}>
        <IconoCerrarSesion></IconoCerrarSesion>
      </Boton>
  )
}

export default BtnClosedSesion
