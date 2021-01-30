import {db} from './firebaseConfig'

const AddGasto = ({categoria, descripcion, cantidad, fecha, uidUsuario}) =>{
  console.log("Ejecutando Add Gasto")
   return db.collection('gastos').add({
           categoria: categoria, 
           descripcion: descripcion,
           cantidad: Number(cantidad), 
           fecha: fecha, 
           uidUsuario: uidUsuario
    })

}

export default AddGasto