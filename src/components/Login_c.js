import React, { useState } from 'react'
import styled from 'styled-components';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  background-color: #f5f5f5;
  justify-content: center;
  height: 100vh;
  align-items: center;
`

const SignUp = styled.div`
  width: 35vw;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: #fff;
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
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 45px;
  transition: border-color 0.4s;
  &:focus{
    border-color: #ee9191;
    outline: none;
  }
  &::placeholder{opacity: 0;}
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  &:last-child{
    margin-bottom: 0; margin-top: 20px;
    justify-content: flex-end; display: flex;
    column-gap: 20px;
    a{
      background-color: #f1a7a7;
      font-size: 14px;
      text-align: center;
      padding: 5px 20px;
      border-radius: 5px;
      color: white;
      &:last-child{
        background-color: #f18e8e;
      }
    }
  }
  input:focus + label,
  input:not(:placeholder-shown) + label{
    top: 4px;
    left: 4px;
    font-size: 8px;
    color:  #ee9191;
  }
`

const Label = styled.label`
  position: absolute;
  top: 10px; left: 10px;
  font-size: 14px; color: #999;
  transition: all 0.3s;
  pointer-events: none;
`

function Login() {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    const [eye,setEye] = useState(false)

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

    const toggleEye = ()=>{
      
    }


    return (
    <>
        <Container>
            <SignUp>
                <Title>로그인</Title>
                <form onSubmit={handleLogin}>
                    <InputWrapper>
                        <Input type="text" value={id} onChange={(e)=>{setId(e.target.value)}}/>
                        <Label>아이디</Label>
                    </InputWrapper>
                    <InputWrapper>
                        <Input type='password' value={pw} onChange={(e)=>{setPw(e.target.value)}}/>
                        <Label>비밀번호</Label>
                        <FontAwesomeIcon style={{position:'absolute',right:'10px',top:'10px'}} icon={faEye}/>
                    </InputWrapper>
                    <Button handleLogin={handleLogin} />
                </form>
            </SignUp>
        </Container>
    </>
  )
}

export default Login