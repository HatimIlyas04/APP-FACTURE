import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GraphPieChart from "./GraphPieChart";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import { AnimeLeft } from "../../styles/animations";

const Graphic = () => {
  return (
    <Container>
      <Content>
        <Link to="/">
          <Back>
            <ArrowLeft />
            Go Back
          </Back>
        </Link>
        <Title>Graphics</Title>
        <GraphPieChart />
      </Content>
    </Container>
  );
};

export default Graphic;

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  max-width: 730px;
  margin: 40px auto 65px auto;
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
  animation: ${AnimeLeft} 0.5s forwards;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
  svg {
    margin-right: 20px;
  }
`;
