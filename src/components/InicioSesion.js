import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import { Formulario, Input,  ContenedorBoton} from '../elements/ElementosForm'
import Boton from '../elements/Boton'
import {ReactComponent as SvgLogin} from '../img/login.svg'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert'
import {auth, db} from '../firebase/firebaseConfig'


const Svg = styled(SvgLogin)`
      width: 100%; 
      max-height: 12.5rem; /*100px */
      margin-bottom: 1.25rem;  /* 20px */


`

const InicioSesion = () => {

  //Agregamos const history 
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 
 //Capturando los values de los inputs 
  const handleChange = (e) =>{
    if (e.target.name === 'email'){
      setEmail(e.target.value)
      console.log(email)
    }else if (e.target.name === 'password'){
      setPassword(e.target.value)
      console.log(password)
    }
  }

  //Funcion onSubmit 
    const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(email, password) 

     //Comprobamos al lado del server si el correo es válido
     //Definimos expresión regular 
     const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
     /* console.log(expresionRegular.test(email)) */
     if ( !expresionRegular.test(email)){
          console.log("Ingresa un email válido")
          swal("Email inválido!", "Ingresa un email válido", "warning");
          return
        }
        //Validamos que todos los datos estén llenos
      if( email=== '' || password === ''){
       
        swal("Llena todos los datos", "You clicked the button!", "info");
        return
      }
      
      //Validamos que ambos password sean iguales 
     
      //Si todo esta Ok Registramos
      
      //Funcion conectar a firebase y registrar users
      //Usamos async await...git

      try{
        // Para iniciar sesion con Firebase usamos el metodo de a continuación:
         await auth.signInWithEmailAndPassword(email,password)
         swal("Iniciaste Sesión", "Presiona Ok para continuar", "success")
         history.push('/')

      }catch (error){
        //Errores personalizados, entramos a error.code y hacemos switch
        //Dependiendo el case, daremos un error más exacto a lo que pasaría
          let mensaje
          switch(error.code){
          
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta'
                    swal("Contraseña Incorrecta", `${mensaje}`, "warning")
                    break
                case 'auth/user-not-found':
                    mensaje = 'No existe cuenta con email ingresado'
                    swal("Email no encontrado", `${mensaje}`, "info")
                    break
                default:
                    mensaje = 'Hubo un error al intentar iniciar la cuenta.'
                      swal("Error", `${mensaje}`, "error")
                break;
            }
            console.log(mensaje)
            //con este console miro el tipo de error que me da firebase
            console.log(error.code)
        
      }

     
    }





  return (
      <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
          <ContenedorHeader>
              <Titulo>Inicia Sesión</Titulo>
              <div>
                <Boton to="/crear-cuenta">Registrarse</Boton>
              </div>
          </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        
          <Svg></Svg>
          
          <Input
            type="email"
            name="email"
            placeholder="Correo"
            value={email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={handleChange}

          />
          
          <ContenedorBoton>
              <Boton as="button" primario type="submit" >Iniciar Sesión</Boton>
          </ContenedorBoton>

      </Formulario>

    </>
  )
}

export default InicioSesion
