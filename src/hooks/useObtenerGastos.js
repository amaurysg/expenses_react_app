import React, {useState, useEffect} from 'react'
import {db} from '../firebase/firebaseConfig'
import {useAuth} from '../contextos/AuthContext'


//Esta funcion se conectará a firebase y nos traerá los gastos almacenados
const useObtenerGastos = () => {
  
  const [gastos, setGastos] = useState([])
  const {usuario} = useAuth()
  const [ultimoGasto, setUltimoGasto] = useState(null)
  const [masPorCargar, setMasPorCargar] = useState(false)
  

  //Logica para obtener mas gastos del array 

  const obtenerMasGastos = ()=>{

    //Accedemos a la coleccion y armamos la logica query
      db.collection('gastos')
      .where('uidUsuario', '==', usuario.uid )
      .orderBy('fecha', 'desc')
      .limit(10)
      .startAfter(ultimoGasto)
      .onSnapshot((snapshot)=>{
        if(snapshot.docs.length >0){
         setUltimoGasto(snapshot.docs[snapshot.docs.length-1])
         
         setGastos(gastos.concat(snapshot.docs.map((g) =>{
           return {...g.data(), id: g.id}
         })))
        }else {
          setMasPorCargar(false)
        }
      })
  }


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
        if(snapshot.docs.length > 0){
          setUltimoGasto(snapshot.docs[snapshot.docs.length-1])
          setMasPorCargar(true)
        }else{
          setMasPorCargar(false)
        }
        setGastos(snapshot.docs.map((g)=>{
          /* console.log(g.data()) */
            return {...g.data(), id: g.id}
        }))
      })
      //Para desmontar el componente, creamos la funcion unSuscribe
      return unSuscribe
      //agregamos usuario, porque necesitamos que cambie cuando se cambie de usuario
  }, [usuario])
  
  return [gastos, obtenerMasGastos, masPorCargar]

}

export default useObtenerGastos
