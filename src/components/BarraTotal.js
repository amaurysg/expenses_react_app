import React from 'react'
import styled from 'styled-components'
import ConvertToCoin from '../funciones/ConvertToCoin'



const BarraTotalStyled = styled.div`
    background: #43A854;
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

const BarraTotal = () => {
  return (
    <BarraTotalStyled>
      <p>Total gastado en el mes</p>
      <p> {ConvertToCoin(0.00)} </p>
    </BarraTotalStyled>
  )
}

export default BarraTotal
