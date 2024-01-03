import React from 'react'
import { NavLink } from 'react-router-dom'

function Main() {
  return (
    <>
      <NavLink to={'/login'}>
        <p>로그인</p>
      </NavLink>
      <NavLink to={'/music'}>
        <p>새앨범리스트</p>
      </NavLink>
    </>
  )
}

export default Main