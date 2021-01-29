import React from 'react'
import {useAuth} from '../contextos/AuthContext'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({children, ...restoPropiedades}) => {
  
  const {usuario} = useAuth()

  if(usuario){
    return <Route {...restoPropiedades}>{children} </Route>
  }else{
    return <Redirect to="/iniciar-sesion"></Redirect>
  }

}

export default ProtectedRoute
