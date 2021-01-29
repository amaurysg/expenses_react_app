import React, {useState, useContext, useEffect} from 'react'
import {auth} from '../firebase/firebaseConfig'

// 1--Creamos contexto estado global
const AuthContext = React.createContext()

// 4--Hook para acceder al contexto , saber si el user inicio o no sesion
const useAuth = () =>{
  return  useContext(AuthContext)
}


// 2--Componente padre 
const AuthProvider = ({children}) => {
  // 5--Creamos estado de usuario 
  const [usuario, setusuario] = useState()

  // Creamos un estado para saber cuando termina de cargar 
  // la comprobacion de un onAuthStateChanged
  const [cargando, setCargando] = useState(true)

  //Efecto para comprobar un user
  useEffect(() =>{
    //Comprobamos si hay usuario
   const cancelarSuscripcion =  auth.onAuthStateChanged((usuario)=>{
      console.log(usuario)
      setusuario(usuario)
      setCargando(false)
    })
    return cancelarSuscripcion
  },[])


  return (
        //3 --Encerramos childres (hijos) en el contexto gral  y le damos Provider
        //    Agregamos un valor global, un objeto
        <AuthContext.Provider value={{usuario: usuario}}>
          { !cargando && children}
        </AuthContext.Provider>

  )
}

//Exportamos Contexto y Provider, e importamos y encerramos en Index.js
export {AuthContext, AuthProvider, useAuth}
