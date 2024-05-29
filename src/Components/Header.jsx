import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Moon } from "../assets/icon-moon.svg";
import { ReactComponent as Sun } from "../assets/icon-sun.svg";
import { ReactComponent as Graph } from "../assets/icon-graph.svg";
import avatar from "../assets/image-avatar.png";
import light from "../styles/light";
import dark from "../styles/dark";
import { AnimeScale } from "../styles/animations";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuperpowers } from "@fortawesome/free-brands-svg-icons";
import { logout } from "../store/auth";

const Header = ({ theme, setTheme }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const changeTheme = () => {
    setTheme((theme) =>
      theme.name !== "light" ? (theme = light) : (theme = dark)
    );
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <HeaderContainer>
      <Container>
        <Link to="/">
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Link>
        <Content>
          <NavIcons>
            { loggedIn &&
            <LinkWrapper>
              <Link to="/graphic">
                <ButtonGraph>
                  <Graph />
                </ButtonGraph>
              </Link>
            </LinkWrapper>
            }
            { !loggedIn && 
            <LinkWrapper>
              <Link to="/login">
                <ButtonLogin>
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/pastel-glyph/64/b3a0ff/person-male--v3.png"
                    alt="person-male--v3"
                  />
                </ButtonLogin>
              </Link>
            </LinkWrapper>
            }
            <ButtonTheme onClick={changeTheme}>
              {theme.name === "light" ? <Moon /> : <Sun />}
            </ButtonTheme>
            { loggedIn && 
            <LinkWrapper>
              <ButtonGraph>
                <img src="/src/assets/logout.png" alt="logout" title="logout" width={35} onClick={handleLogout} />
              </ButtonGraph>
            </LinkWrapper>
            }
          </NavIcons>
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
  position: fixed;
  z-index: 2000;
  @media (max-width: 800px) {
    padding: 0px;
    position: initial;
  }
`;

const Container = styled.div`
  background: ${({ theme }) => theme.bgQuinary};
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom-right-radius: 20px;
  @media (max-width: 800px) {
    height: initial;
    width: 100%;
    flex-direction: row;
    border-bottom-right-radius: 0px;
  }
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
    overflow: visible;
  }
  @media (max-width: 800px) {
    width: 72px;
    top: 0px;
    display: flex;
    justify-content: center;
  }
`;

const Content = styled.div`
  @media (max-width: 800px) {
    display: flex;
    align-items: flex-start; /* Align items to the top */
  }
`;

const NavIcons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  align-items: center;
  gap: 20px; /* Added space between the links */
  margin-bottom: 10px;
  @media (max-width: 800px) {
    flex-direction: row;
    margin: 0px 10px 0px 0px;
    gap: 10px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonTheme = styled.button`
  padding: 5px;
  cursor: pointer;
  position: relative;
  left: -3px;
  svg {
    animation: ${AnimeScale} 0.5s forwards;
  }
  @media (max-width: 500px) {
    svg {
      width: 22px;
      position: relative;
      top: 2px;
    }
  }
`;

const ButtonGraph = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  position: relative;
  left: -3px;
  svg {
    width: 30px;
  }
  @media (max-width: 500px) {
    svg {
      width: 22px;
    }
  }
`;

const ButtonLogin = styled.button`
  padding: 5px;
  cursor: pointer;
`;

const ContainerImg = styled.div`
  border-top: 1px solid ${({ theme }) => theme.detailsGray};
  padding: 24px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    position: relative;
    left: -2px;
  }
  @media (max-width: 800px) {
    border-top: none;
    border-left: 1px solid ${({ theme }) => theme.detailsGray};
    padding: 24px 32px;
    display: flex;
  }
  @media (max-width: 500px) {
    padding: 20px 24px;
  }
`;
