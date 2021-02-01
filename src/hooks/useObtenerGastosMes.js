import React, {useState, useEffect} from 'react'
import {db} from '../firebase/firebaseConfig'
import {startOfMonth, endOfMonth, getUnixTime} from 'date-fns'
import {useAuth} from '../contextos/AuthContext'

const useObtenerGastosMes = () => {
  const [gastosMes, setGastosMes] = useState([])
  const {usuario} = useAuth()
  //Estamos dentro de un hooks, entonces hagamos un efecto por primera vez
  useEffect(() => {

    const inicioMes = getUnixTime(startOfMonth(new Date))
    const finDeMes = getUnixTime(endOfMonth(new Date))
    /* console.log(inicioMes, finDeMes) */
    
   if(usuario){
     const unSuscribe =  db.collection('gastos')
      .orderBy('fecha', 'desc')
      .where('uidUsuario', '==' , usuario.uid )
      .where('fecha', '>=', inicioMes)
      .where('fecha', '<=', finDeMes)
      .onSnapshot((snapshot)=>{

        setGastosMes( snapshot.docs.map((doc)=>{
         /*  console.log(doc.data()) */
         return { ...doc.data(), id: doc.id }
      }))
    })
    return unSuscribe;
   }
    //Use effect tiene que retornar una función que se va a ejecutar cuando se 
    //desmonte el componente
    //En este caso se ejecutata unSuscribe a la coleccion de firestore
  }, [usuario])


  
  return gastosMes
   
}

export default useObtenerGastosMes
