import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 100%; padding: 10px;
  border-radius: 5px;
  background-color: ${(props)=>(props.bgc || "#eb7a7a")};
  border: none;
  color: #fff;
  cursor: pointer;
`

function Button({handleLogin,bgc}) {
  return (
    <>
        <StyledButton bgc={bgc} onClick={handleLogin}>로그인</StyledButton>
    </>
  )
}

export default Button