import {db} from './firebaseConfig'

//Para editar, es muy similar al codigo de ADD
//Sin embargo cambian los métodos... 

//Derfinimos variables que necesitamos, 
const EditarGasto = ({id, categoria, descripcion, cantidad, fecha}) =>{
  console.log("Ejecutando Edit Gasto")
  //accedemos al documento por su id --> doc(id)
  //Metodo update para actualizar
   return db.collection('gastos').doc(id).update({
           categoria: categoria, 
           descripcion: descripcion,
           cantidad: Number(cantidad), 
           fecha: fecha
           
    })

}

export default EditarGasto