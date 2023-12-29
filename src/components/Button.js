import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 100%; padding: 10px;
  border-radius: 5px;
  background-color: ${(props)=>(props.backgroundColor || "#eb7a7a")};
  /* background-color: ${(props)=>(props.theme.colors.inputFocus)}; */
  border: none;
  color: ${(props)=>(props.theme.colors.white)};
  cursor: pointer;
`

function Button({handleLogin,backgroundColor}) {
  return (
    <>
        <StyledButton backgroundColor={backgroundColor} onClick={handleLogin}>로그인</StyledButton>
    </>
  )
}

export default Button