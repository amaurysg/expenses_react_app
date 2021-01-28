import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from '../elements/Header'
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from '../elements/ElementosForm'
import Boton from '../elements/Boton'
import {ReactComponent as SvgLogin} from '../img/registro.svg'
import styled from 'styled-components'
import swal from 'sweetalert'
import {auth} from '../firebase/firebaseConfig'
import {useHistory} from 'react-router-dom'
import Alerta from '../elements/Alerta'

const Svg = styled(SvgLogin)`
      width: 100%; 
      max-height: 6.25rem; /*100px */
      margin-bottom: 1.25rem;  /* 20px */


`

const RegistroUser = () => {

  //Agregamos const history 
  const history = useHistory()

  //Variables de estado
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleChange = (e) =>{
    console.log(e.target.name)
    switch (e.target.name) {
      case 'email':
            setEmail(e.target.value)
            break;
    
      case 'password':
            setPassword(e.target.value)
            break;
    
      case 'repeatPassword':
            setRepeatPassword(e.target.value)
            break;
    
      default:
        break;
    }
  }

  const handleSubmit = async (e) =>{
      e.preventDefault()
      console.log(email, password, repeatPassword) 

     //Comprobamos al lado del server si el correo es válido
     //Definimos expresión regular 
     const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
     /* console.log(expresionRegular.test(email)) */
     if ( !expresionRegular.test(email)){
          console.log("Ingresa un email válido")
          swal("No es un email!", "You clicked the button!", "warning");
          return
        }
        //Validamos que todos los datos estén llenos
      if( email=== '' || password === '' || repeatPassword === ''){
       
        swal("Llena todos los datos", "You clicked the button!", "info");
        return
      }
      
      //Validamos que ambos password sean iguales 
      if(  password !== repeatPassword ){
          swal("Error", "Las contraseñas no son iguales", "info");
        console.log("Las contraseñas no son iguales")
        return
      }
      //Si todo esta Ok Registramos
      
      //Funcion conectar a firebase y registrar users
      //Usamos async await...

      try{
        //
         await auth.createUserWithEmailAndPassword(email,password)
         swal("Usuario Registrado", "You clicked the button!", "success")
         history.push('/')

      }catch (error){
        //Errores personalizados, entramos a error.code y hacemos switch
        //Dependiendo el case, daremos un error más exacto a lo que pasaría
          let mensaje
          switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                   
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }
            console.log(mensaje)
      }
    

      //Metodo then, catch

        /* auth.createUserWithEmailAndPassword(email,password)
          .then(()=>{
           console.log("Usario Registrado con éxtio")
          swal("Usuario Registrado", "You clicked the button!", "success")

        })
        .catch(()=>{
          console.log("Algo falló")
        }) */
     



    }
      
  


  return (
     <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
          <ContenedorHeader>
              <Titulo>Crear cuenta</Titulo>
              <div>
                <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
              </div>
          </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        
          <Svg></Svg>
          
          <Input
            type="text"
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
          <Input
            type="password"
            name="repeatPassword"
            placeholder="Repetir Contraseña"
            value={repeatPassword}
            onChange={handleChange}
          />
          <ContenedorBoton>
              <Boton as="button" primario type="submit" >Crear Cuenta</Boton>
          </ContenedorBoton>

          </Formulario>
         {/*  <Alerta
            tipo="exito"
            mensaje="Amaury"
            estadoAlerta={true}
          
          /> */}
    </>
  )
}

export default RegistroUser
