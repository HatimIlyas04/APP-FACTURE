import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GraphPieChart from "./GraphPieChart";
import TriangleChart from "./TriangleChart";
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
        <ContainerGraphs>
          {<GraphPieChart />}
          <TriangleChart />
        </ContainerGraphs>
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
  padding: 20px;
  padding-left: 90px;
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

const ContainerGraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;
