import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import Login from './views/Login'
import Welcome from './views/Welcome'

function App() {
  return (
    <div className="root">
      <div className='root-wrapper'>

        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
        </Routes>

      </div>

    </div>
  );
}

export default App;
