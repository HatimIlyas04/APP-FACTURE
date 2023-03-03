import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMedia from "../../Hooks/useMedia";
import styled, { css, keyframes } from "styled-components";
import { AnimeBackAndFront } from "../../styles/animations";
import { ReactComponent as Play } from "../../assets/play-circle.svg";
import { ReactComponent as Stop } from "../../assets/stop-circle.svg";

const TriangleChart = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);
  const mobile = useMedia("(max-width: 500px)");
  const [valueForStatus, setValueForStatus] = useState([]);
  const [triangleData, setTriangleData] = useState([]);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    const arrayOfValuesByStatus = Object.values(
      invoices.reduce((acc, { status, total }) => {
        acc[status] = acc[status] || { type: status, total: 0 };
        acc[status].total += total;
        return acc;
      }, {})
    );
    setValueForStatus(() => arrayOfValuesByStatus);
  }, []);

  const calculatePercentage = (value, total) =>
    Math.floor((value / total) * 100);

  useEffect(() => {
    const total = valueForStatus.reduce((accum, { total }) => accum + total, 0);
    const sortStatus = valueForStatus.sort((a, b) => a.total - b.total);
    const dataOfTriangle = sortStatus.map((item, i) => {
      console.log(calculatePercentage(item.total, total));
      const multiplyHeight = mobile ? 5 : 7
      const value = calculatePercentage(item.total, total) * multiplyHeight;
      const height = value < 100 ? 150 : value > 300 ? 350 : value;
      const zIndex = i === 0 ? 100 : i === 1 ? 50 : 10;
      let left = i === 1 ? 120 : i === 2 ? 220 : 0;
      if (mobile) {
        left = i === 1 ? 60 : i === 2 ? 120 : 0;
      }

      return {
        ...item,
        left,
        height: i === 1 ? height + 40 : height,
        zIndex,
        percentage: calculatePercentage(item.total, total),
      };
    });
    setTriangleData(() => dataOfTriangle);
    console.log(dataOfTriangle);
  }, [valueForStatus]);

  console.log(valueForStatus);

  return (
    <Container>
      <GraphContainer>
        <TriangleContainer color={triangleData[2]?.type}>
          {triangleData.map((data) => (
            <Triangle key={data.type} data={data} anime={animation} />
          ))}
          <ButtonAnime
            color={triangleData[2]?.type}
            onClick={() => setAnimation(!animation)}
          >
            {animation ? <Stop /> : <Play />}
          </ButtonAnime>
        </TriangleContainer>
      </GraphContainer>
    </Container>
  );
};

export default TriangleChart;

const Container = styled.div``;

const GraphContainer = styled.div`
  padding: 30px 30px 80px 30px;
  box-shadow: ${({ theme }) => theme.shadowPrimary};
  display: flex;
  justify-content: center;
  position: relative;
  height: 500px;
`;

const TriangleContainer = styled.div`
  width: 420px;
  border-bottom: 4px solid ${({ theme, color }) => theme[color]};
  position: relative;
  @media (max-width: 500px) {
    width: 200px;
    left: 10px;
  }
  @media (max-width: 370px) {
    left: 30px;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: ${({ theme, data: { type, height } }) =>
    `${height}px solid ${theme[type]}`};
  position: absolute;
  bottom: 20px;
  left: ${({ data }) => data.left}px;
  z-index: ${({ data }) => data.zIndex};
  &::before {
    content: "${({ data }) => data.percentage}%";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: #fff;
    background: ${({ theme, data }) => theme[data.type]};
    position: absolute;
    top: -23px;
    left: -120px;
    z-index: 500;
    ${({ anime }) =>
      anime &&
      css`
        animation: ${keyframes`
          0% {
            transform: translate3d(90px, 0px, 0px);
          }
          100% {
            transform: translate3d(0px, 0px, 0px);
          }
        `} 2s alternate infinite;
      `}
  }
  &::after {
    content: "";
    width: 60px;
    height: 2px;
    background: #dbd6d6;
    position: absolute;
    left: -75px;
    top: 0px;
    z-index: 400;
  }
  @media (max-width: 500px) {
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    &::before {
      width: 50px;
      height: 50px;
      font-size: 14px;
    }
  }
`;

const ButtonAnime = styled.span`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -410px;
  svg path {
    fill: ${({ theme, color }) => theme[color]};
  }
`;
