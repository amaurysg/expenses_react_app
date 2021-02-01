import React, {useState, useEffect} from 'react'
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
import {useHistory} from 'react-router-dom'
import EditarGasto from '../firebase/EditarGasto'

const FormGastos = ({gasto}) => {
  const [descripcion, setDescripcion] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('hogar')
  const [fecha, setFecha] = useState(new Date())
  const {usuario} = useAuth()
  const history = useHistory()


  //useEffect para comprobar si existe el gasto y llenar
  useEffect(() => {
    //Comprobamos si ya hay un gasto 
    //De ser así establecemos todo el state con los valores del gasto
    if(gasto){

      if(gasto.data().uidUsuario === usuario.uid){
        console.log(gasto.data())
        //Si el gasto existe llenamos los parametros... 
        setCategoria(gasto.data().categoria)
        setFecha(fromUnixTime(gasto.data().fecha))
        setDescripcion(gasto.data().descripcion)
        setCantidad(gasto.data().cantidad)

      }else{
        history.push('/lista')
      }
    }

    //Agregamos dependencias usadas
  }, [gasto, usuario, history])

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
    //Si descripcion y cantidad diferentes de ' '
    if (descripcion !== '' && cantidad !=='' ){
      //Primero si existe un gasto editamos UPDATE
      if(gasto){
        //Mostramos el gasto con este console de test
        console.log(gasto.id)
        //En caso de que exista el gasto, aqui capturamos 
        //los parametros 
        EditarGasto({
          id : gasto.id,
          categoria: categoria,
          descripcion : descripcion, 
          cantidad: cantidadDecimal,
          fecha : getUnixTime(fecha),             
        })
        .then(()=>{
          swal("Se editó el gasto", "Gasto editado", "success")
          history.push('/')
        })
        .catch((error)=>{
          swal("Algo salió mal", "No se ha actualizado el gasto", "error")
          console.log(error)
        }
        )
        //En caso de que no tengamos un gasto, hay que Agregar ADD !
      }else{
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
      }
     
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
              <Boton as="button" primario conIcono type="submit">
               {/*  Agregamos un condicional ternario para el texto en caso de que 
                sea a editar o agregar */}
                {
                  gasto ? 'Editar Gasto' : 'Agregar Gasto'
                }
                
                <IconoPlus></IconoPlus>
              </Boton>
        </ContenedorBoton>

      </Formulario>
  )
}

export default FormGastos
