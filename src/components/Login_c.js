import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { setCredentials } from '../store';

const Container = styled.div`
  display: flex;
  background-color: ${(props)=>(props.theme.colors.bgColor)};
  justify-content: center;
  height: 100vh;
  align-items: center;
`

const SignUp = styled.div`
  width: 35vw;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: ${(props)=>(props.theme.colors.white)};
  border-radius: 10px;
  @media screen and (max-width: 640px){
    width: 70vw;
  }
  @media screen and (max-width: 1024px){
    width: 60vw;
  }
`

const Title = styled.h1`
  font-size: 24px;
  text-align: center; margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%; padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props)=>(props.theme.colors.inputBorder)};
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 45px;
  transition: border-color 0.4s;
  &:focus{
    border-color: ${(props)=>(props.theme.colors.inputFocus)};
    outline: none;
  }
  &::placeholder{opacity: 0;}
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  input:focus + label,
  input:not(:placeholder-shown) + label{
    top: 4px;
    left: 4px;
    font-size: 8px;
    color:  ${(props)=>(props.theme.colors.inputFocus)};
  }
`

const Label = styled.label`
  position: absolute;
  top: 10px; left: 10px;
  font-size: 14px; color: ${(props)=>(props.theme.colors.labelColor)};
  transition: all 0.3s;
  pointer-events: none;
`

function Login() {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    const [isPwVisible,setIsPwVisible] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("아이디" + id )
        console.log("비밀번호" + pw)

        if (!id) {
            return alert("아이디를 입력하세요.");
        }
        else if (!pw) {
            return alert("비밀번호를 입력하세요.");
        }
        dispatch(setCredentials({id,pw}))
        navigate('/test')
    }

    return (
    <>
        <Container>
            <SignUp>
                <Title>로그인</Title>
                <form>
                    <InputWrapper>
                        <Input placeholder='아이디' type="text" value={id} onChange={(e)=>{setId(e.target.value)}}/>
                        <Label>아이디</Label>
                    </InputWrapper>
                    <InputWrapper>
                        <Input placeholder='비밀번호' type={isPwVisible ? 'text' : 'password'} value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                        <Label>비밀번호</Label>
                        <FontAwesomeIcon onClick={()=>{setIsPwVisible(!isPwVisible)}} style={{position:'absolute',right:'10px',top:'10px',cursor:'pointer'
                      }} icon={isPwVisible ? faEye : faEyeSlash}/>
                    </InputWrapper>
                    <Button handleLogin={handleLogin} />
                </form>
            </SignUp>
        </Container>
    </>
  )
}

export default Login