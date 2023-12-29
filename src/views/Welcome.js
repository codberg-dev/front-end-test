import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Welcome() {

  const navigate = useNavigate()

  const user = useSelector((state) => state.userInfoState)

  return (
    <div className='login-ok-container'>
        {   <>
              <h1>로그인 성공</h1>
              <p>어서오세요, {user.userID}님!!</p>
              <p>비밀번호는 {user.userPW}</p>
            </>
        }

        <button onClick={() => navigate('/album') }>최신 앨범 보러가기</button>
    </div>
  )
}

export default Welcome;