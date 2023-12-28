import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import TestPage from "./pages/TestPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
