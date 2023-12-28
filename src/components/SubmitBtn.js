import React from 'react'
import styled from 'styled-components'

const SubmitButton = styled.button`
    display: block; width: 100%;
    padding: 10px 20px; border-radius: 5px;
    border: none; cursor: pointer;
    color: white; font-weight: bold; font-size: 18px;
    background-color: ${props => props.$backgroundColor || '#86A789'}
  `;

function SubmitBtn({$backgroundColor, $clickEvent}) {

  return (
    <SubmitButton type='submit' $backgroundColor={$backgroundColor} onClick={$clickEvent}>로그인</SubmitButton>
  )
}

export default SubmitBtn;