import {useState, useEffect} from 'react'
import {db} from '../firebase/firebaseConfig'
import {useHistory} from 'react-router-dom'

// Import the states and effect 
//Import db from firebase connection
//Import useHistory for push '/'

const useObtenerGasto = (id) => {
  const history = useHistory()
  //Establecemos gasto
  const [gasto, setGasto] = useState('')

  useEffect(() => {
    //Nos conectamos a la db y coleccion gasto
    //Metodo doc que nos permite acceder  a un doc por su Id
    //Metodo get obtenemos 
    //Como es una promesa, validadmos con them y obtenemos doc 

    db.collection('gastos').doc(id).get()
    .then((doc)=>{
    console.log(doc.data())
     if(doc.exists){
       setGasto(doc)
     }else{
       history.push('/lista')
     }
    })
  //Nos conectamos una sola vez  y agregamos las dependencias que usamos 
  //en el effect
  }, [history, id])
 
 //Devolvemos el valor del estado gasto
  return [gasto]
}

export default useObtenerGasto
