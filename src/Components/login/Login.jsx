import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import { AnimeLeft } from "../../styles/animations";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modal";
import FormLogin from "./FormLogin";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeModal());
  }, []);

  return (
    <Container>
      <Content>
        <Link to="/">
          <Back>
            
          </Back>
        </Link>
        <Title></Title>
        <FormLogin />
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  max-width: 730px;
  margin: 40px auto 65px auto;
  padding: 0px 20px 20px 90px;
  animation: ${AnimeLeft} 0.5s;
  @media (max-width: 800px) {
    padding-left: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const Back = styled.button`
  margin-bottom: 20px;
  margin-left: 20px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
  svg {
    margin-right: 20px;
  }
`;
