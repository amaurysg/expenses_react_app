import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from '../elements/ElementosForm'
import Boton from '../elements/Boton'
import {ReactComponent as SvgLogin} from '../img/login.svg'
import styled from 'styled-components'


const Svg = styled(SvgLogin)`
      width: 100%; 
      max-height: 12.5rem; /*100px */
      margin-bottom: 1.25rem;  /* 20px */


`

const InicioSesion = () => {
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

      <Formulario>
        
          <Svg></Svg>
          
          <Input
            type="email"
            name="email"
            placeholder="Correo"
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
          />
          
          <ContenedorBoton>
              <Boton as="button" primario type="submit" >Iniciar Sesión</Boton>
          </ContenedorBoton>

      </Formulario>

    </>
  )
}

export default InicioSesion
