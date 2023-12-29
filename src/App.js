import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components"
import { theme } from "./theme";
import Main from "./pages/Main";
import Login from "./pages/Login";
import TestPage from "./pages/TestPage";
import Music from "./pages/Music";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
          <Route path="/music" element={<Music />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
