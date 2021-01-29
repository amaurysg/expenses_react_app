import React, {useState} from 'react'
import styled from 'styled-components'
import {ReactComponent as IconoDown} from '../img/down.svg'
import IconoCategoria from '../elements/IconCat'


const ContenedorSelect = styled.div`
    background: #E8EFF1;
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
    position: relative;
    height: 5rem; /* 80px */
    width: auto;
    padding: 0px 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    &:hover {
        background: #CBDDE2;
    }
`;
 
const OpcionSeleccionada = styled.div`
    width: auto;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        width: 1.25rem; /* 20px */
        height: auto;
        margin-left: 1.25rem; /* 20px */
    }
`;
 
const Opciones = styled.div`
    background: #E8EFF1;
    position: absolute;
    top: 5.62rem; /* 90px */
    left: 0;
    width: auto;
    border-radius: 0.625rem; /* 10px */
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
`;
 
const Opcion = styled.div`
    padding: 1.25rem; /* 20px */
    display: flex;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: #CBDDE2;
    }
`;




const SelectCat = ({categoria,setCategoria}) => {

  const [mostrarSelect, setMostrarSelect] = useState(false)
  
  const categorias = [
        {id: 'comida', texto: 'Comida'},
        {id: 'cuentas y pagos', texto: 'Cuentas y pagos'},
        {id: 'hogar', texto: 'Hogar'},
        {id: 'transporte', texto: 'Transporte'},
        {id: 'ropa', texto: 'Ropa'},
        {id: 'salud e higiene', texto: 'Salud e Higiene'},
        {id: 'compras', texto: 'Compras'},
        {id: 'diversion', texto: 'Diversion'}
    ]
  
  const handleClick = (e) =>{
    console.log(e.currentTarget.dataset.valor)
    setCategoria(e.currentTarget.dataset.valor)
  }

  return (
    <div>
      <ContenedorSelect onClick={()=>setMostrarSelect(!mostrarSelect)}>
          <OpcionSeleccionada> {categoria} <IconoDown/> </OpcionSeleccionada>
          
          {
            mostrarSelect &&
          <Opciones>
            {
              categorias.map((c)=>{
                return <Opcion 
                            key={c.id} 
                            data-valor={c.id}
                            onClick={handleClick}
                           > 
                                
                             <IconoCategoria id={c.id}/>  {c.texto}
                        </Opcion>
              })
            }
          </Opciones>

          }



      </ContenedorSelect>
    </div>
  )
}

export default SelectCat
