import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';

import SubmitBtn from '../components/SubmitBtn'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/store';

import { colors } from '../colors';

const LoginWrapper = styled.div`
    display: flex; justify-content: center;
    margin-top: 20px;
`;

const StyledForm = styled.form`
    width: 400px;
    background-color: #D2E3C8;
    border-radius: 10px;
    padding: 20px;
    & > label{
        color: black;
        display: block; margin-bottom: 5px;
    }
    & > input {
        padding: 10px; border-radius: 5px;
        display: block; margin-bottom: 15px;
        width: calc(100% - 20px);
        border: none;
    }
`;

export default function Login() {

    const [id, setID] = useState('')
    const [pw, setPW] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        // e.preventDefault()

        console.log(`ID : ${id}, PW : ${pw}`)

        if (id === '') {
            alert('아이디를 입력하세요.')
        } else if (pw === '') {
            alert('비밀번호를 입력하세요.')
        } else {
            dispatch( setUserInfo({ID: id, PW: pw}) );
            alert('Welcome..!!')
            navigate('/welcome')
        }
    }

  return (
    <div className='login-container'>

        <LoginWrapper>

            <StyledForm onSubmit={handleLogin}>

                <label htmlFor="id">아이디</label>
                <input type="text" id="id" name="id" onChange={(e) => setID(e.target.value)}></input>

                <label htmlFor="pw">비밀번호</label>
                <input type="password" id="pw" name="pw" onChange={(e) => setPW(e.target.value)}></input>

                <SubmitBtn
                    backgroundColor={colors.blue}
                >로그인</SubmitBtn>
                
            </StyledForm>

        </LoginWrapper>

    </div>
  )
}
