import { useEffect, useState} from 'react'

import useObtenerGastosMes from './useObtenerGastosMes'

const useObtenerMesCat = () => {
  const [gastosPorCategoria, setGastorPorCategoria] = useState([])  
  const gastosMes = useObtenerGastosMes()
 /*  console.log(gastosMes) */

 useEffect(() => {
    const sumaDeGastos =  gastosMes.reduce((objetoResultante, objetoActual)=>{
    const categoriaActual = objetoActual.categoria
    const cantidadActual = objetoActual.cantidad

    objetoResultante[categoriaActual] += cantidadActual
    return objetoResultante
  }, {
    'comida': 0,
    'cuentas y pagos': 0,
    'hogar': 0,
    'transporte': 0,
    'ropa': 0,
    'salud e higiene': 0,
    'compras': 0,
    'diversion': 0
  })

  setGastorPorCategoria(Object.keys(sumaDeGastos).map((elemento)=>{
    return {
      categoria: elemento, 
      cantidad: sumaDeGastos[elemento]
    }
  }))
  
 }, [gastosMes,setGastorPorCategoria])



 
  
  return gastosPorCategoria ;  
  
}

export default useObtenerMesCat
