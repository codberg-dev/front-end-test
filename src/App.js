import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import Login from './views/Login'
import Welcome from './views/Welcome'

import { lightMode, darkMode } from './colors/theme'

const ThemeSetter = styled.div`
  cursor: pointer; padding: 10px;
  position: absolute; top: 10px; right: 10px;
  border: 1px solid black; border-radius: 5px;
`

function App() {

  const [nowTheme, setTheme] = useState('light')

  return (

    <ThemeProvider theme={nowTheme === 'light' ? lightMode : darkMode}>
      <div className="root">
        <div className='root-wrapper'>

          <ThemeSetter onClick={() => {
            nowTheme === 'light' && setTheme('dark')
            ||
            nowTheme === 'dark' && setTheme('light')
          }}>
            다크모드 전환
          </ThemeSetter> 

          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/welcome" element={<Welcome />}></Route>
          </Routes>

        </div>

      </div>
    </ThemeProvider>

  );
}

export default App;
