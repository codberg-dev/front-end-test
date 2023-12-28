import React from 'react'
import { useSelector } from 'react-redux'

function TestPage() {
    const userState = useSelector((state) => state.user);
  return (
    <>
        <div>
            <h1>로그인 정보</h1>
            <p>ID : {userState.id}</p>
            <p>Password : {userState.pw}</p>
        </div>
    </>
  )
}

export default TestPage