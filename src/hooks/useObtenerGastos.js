import React, {useState, useEffect} from 'react'
import {db} from '../firebase/firebaseConfig'
import {useAuth} from '../contextos/AuthContext'


//Esta funcion se conectará a firebase y nos traerá los gastos almacenados
const useObtenerGastos = () => {
  
  const [gastos, setGastos] = useState([])
  const {usuario} = useAuth()
 
  


  useEffect(() => {
    //const Unsuscribe porque vamos a querer retornar y desmontar
    // el componente
    //Accedemos al la bd gastos, seguido aplicamos los querys
   const unSuscribe =   db.collection('gastos')
      .where('uidUsuario', '==', usuario.uid )
      .orderBy('fecha', 'desc')
      .limit(10)
      .onSnapshot((snapshot)=>{
        /* console.log(snapshot.docs) */
        setGastos(snapshot.docs.map((g)=>{
          /* console.log(g.data()) */
            return {...g.data(), id: g.id}
        }))
      })
      //Para desmontar el componente, creamos la funcion unSuscribe
      return unSuscribe
      //agregamos usuario, porque necesitamos que cambie cuando se cambie de usuario
  }, [usuario])
  
  return [gastos]

}

export default useObtenerGastos
