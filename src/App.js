import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import TestPage from "./pages/TestPage";
import { ThemeProvider } from "styled-components"
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
