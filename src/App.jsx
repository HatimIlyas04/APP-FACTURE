import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import light from "./styles/light";
import dark from "./styles/dark";
import GlobalStyle from "./styles/global";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  const [theme, setTheme] = useState(light);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Header theme={theme} setTheme={setTheme}/>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  background: ${({theme}) => theme.bgPrimary};
  transition: 0.5s ease-in-out;
  min-height: 100vh;
  display: flex;
`;
