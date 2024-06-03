import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import light from "./styles/light";
import GlobalStyle from "./styles/global";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import SingleInvoice from "./Components/SingleInvoice/SingleInvoice";
import { useSelector } from "react-redux";   
import useMedia from "./Hooks/useMedia";   
import Graphic from "./Components/Graphic/Graphic";
import Login from "./Components/Login/Login";  
 
function App() {
  const [theme, setTheme] = useState(light); 
  const { modal } = useSelector((state) => state.modal);
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  const mobile = useMedia("(max-width: 700px)");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if(!mobile) {
      document.body.style.overflow = modal ? "hidden" : "auto"; 
    }
  }, [modal, mobile]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Header theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="invoice/:id" element={<SingleInvoice />} />
            <Route path="graphic" element={<Graphic />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          
        </Container> 
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  background: ${({ theme }) => theme.bgPrimary};
  min-height: 100vh;
  display: flex;
  transition: 0.5s ease-in-out;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
