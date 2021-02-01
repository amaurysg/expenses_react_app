import React, {useState, useEffect, useContext} from 'react'
import useObtenerGastosMes from '../hooks/useObtenerGastosMes'
//Creamos contexto
const TotalGastadoContext = React.createContext()

const useTotalMes = () => useContext(TotalGastadoContext)

//Creamos provider
//Dentro creamos estado e inyectamos el estado en el codigo jsx
const TotalGastadoProvider = ({children}) =>{
  const [total, setTotal] = useState(0)
  const gastosMes = useObtenerGastosMes()

  useEffect(() => {
    /* console.log(gastosMes) */
    let acumulado = 0
  /*   console.log(gastosMes) */
    gastosMes.forEach((g) =>{
      acumulado += g.cantidad
    })
    /* console.log(acumulado) */
   setTotal(acumulado)
  }, [gastosMes])

    return (
      <TotalGastadoContext.Provider value={{total: total}}>  
        {children}
      </TotalGastadoContext.Provider>  

    )
}


export {TotalGastadoProvider, useTotalMes}