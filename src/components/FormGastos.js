import React, {useState} from 'react'
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from '../elements/ElementosForm'
import Boton from '../elements/Boton'
import {ReactComponent as IconoPlus} from '../img/plus.svg'
import SelectCat from './SelectCat'
import DatePicker from './DayPicker'
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import AddGasto from '../firebase/AddGasto'
import {useAuth} from '../contextos/AuthContext'
import swal from 'sweetalert'

const FormGastos = () => {
  const [descripcion, setDescripcion] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('hogar')
  const [fecha, setFecha] = useState(new Date())
  const {usuario} = useAuth()

  const handleChange = (e) =>{
    if(e.target.name === 'descripcion'){
      setDescripcion(e.target.value)

    }else if (e.target.name === 'cantidad'){
      //Usaremos value.replace para asignar una expresión regular 
      setCantidad(e.target.value.replace(/[^0-9.]/g, ''))
    }
  }



  const handleSubmit = (e) =>{
    e.preventDefault()
    /* console.log(descripcion,cantidad, categoria, fecha) */
    let cantidadDecimal = parseFloat(cantidad).toFixed(2)

    //Validaciones
    if (descripcion !== '' && cantidad !=='' ){
      console.log(usuario)
      AddGasto({
        categoria: categoria,
        descripcion : descripcion, 
        cantidad: cantidadDecimal,
        fecha : getUnixTime(fecha),
        uidUsuario: usuario.uid
      })
      .then(()=>{
        setCategoria('hogar')
        setFecha(new Date())
        setCantidad('')
        setDescripcion('')
        swal("Gasto agredado","Tu gasto ha sido agregado","success")
      })
      .catch((error)=>{
        swal("Hubo un error","Revisa tu conexión","error")
        console.log(error)
      })  
      
    }else{
      swal("Llenar datos","Te faltan datos a completar","info")
    }


 


  }

  return (
      <Formulario onSubmit={handleSubmit}>
        <ContenedorFiltros>
              <SelectCat categoria={categoria} 
                         setCategoria={setCategoria} 
                         />
              <DatePicker fecha={fecha} setFecha={setFecha}></DatePicker>
        </ContenedorFiltros>
        
        <div>
            <Input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                defaultValue="Reset"
                value={descripcion}
                onChange={handleChange}
                
            />
            <InputGrande
                type="text"
                name="cantidad"
                placeholder="$0,00"
                value={cantidad}
                onChange={handleChange}
            />

        </div>

        <ContenedorBoton>
              <Boton as="button" primario conIcono type="submit">Agregar Gasto 
                <IconoPlus></IconoPlus>
              </Boton>
        </ContenedorBoton>

      </Formulario>
  )
}

export default FormGastos
