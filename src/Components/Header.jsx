import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import { ReactComponent as Sun } from "../assets/icon-sun.svg";
import avatar from "../assets/image-avatar.jpg";
import light from "../styles/light";
import dark from "../styles/dark";
import { AnimeScale } from "../styles/animations";

const Header = ({ theme, setTheme }) => {
  const changeTheme = () => {
    setTheme((theme) =>
      theme.name !== "light" ? (theme = light) : (theme = dark)
    );
  };

  return (
    <HeaderContainer>
      <Container>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Content>
          <ButtonTheme onClick={changeTheme}>
            {theme.name === "light" ? <Moon /> : <Sun />}
          </ButtonTheme>
          <ContainerImg>
            <img src={avatar} alt="Avatar" />
          </ContainerImg>
        </Content>
      </Container>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  padding-top: 20px;
`;

const Container = styled.div`
  background: ${({ theme }) => theme.bgQuinary};
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  background: ${({ theme }) => theme.variantColors.primary.normal};
  width: 100%;
  padding: 32px;
  border-radius: 0px 20px 20px 0px;
  position: relative;
  top: -20px;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 50%;
    z-index: 10;
    left: 0px;
    bottom: 0px;
    background: ${({ theme }) => theme.variantColors.primary.hover};
    border-radius: 20px 0px 20px 0px;
  }
  svg {
    position: relative;
    z-index: 1000;
  }
`;

const Content = styled.div``;
const ButtonTheme = styled.button`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  svg {
    animation: ${AnimeScale} 0.5s forwards;
  }
`;

const ContainerImg = styled.div`
  border-top: 1px solid ${({theme}) => theme.detailsGray};
  padding: 24px 32px;
  img {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
  }
`;
