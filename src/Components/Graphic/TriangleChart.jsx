import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMedia from "../../Hooks/useMedia";
import styled, { css, keyframes } from "styled-components";
import { AnimeBackAndFront } from "../../styles/animations";
import { ReactComponent as Play } from "../../assets/play-circle.svg";
import { ReactComponent as Stop } from "../../assets/stop-circle.svg";
import { formatCurrency } from "../../Helper/format";

const TriangleChart = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);
  const mobile = useMedia("(max-width: 540px)");
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
      const multiplyHeight = mobile ? 5 : 7;
      const value = calculatePercentage(item.total, total) * multiplyHeight;
      const height = value < 100 ? 150 : value > 350 ? 350 : value;
      const zIndex = i === 0 ? 100 : i === 1 ? 50 : 10;
      let left = i === 1 ? 120 : i === 2 ? 220 : 0;
      if (mobile) {
        left = i === 1 ? 60 : i === 2 ? 120 : 0;
      }
      return {
        ...item,
        left,
        height: i === 1 && height < 151 && height < 300 ? height + 40 : height,
        zIndex,
        percentage: calculatePercentage(item.total, total) || 0,
      };
    });
    setTriangleData(() => dataOfTriangle);
  }, [valueForStatus, mobile]);


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
          <LegendContainer>
            <LegendTitle>Value of status</LegendTitle>
            <Legend>
              {triangleData.map(({ type, total }) => (
                <LegendItem key={type} color={type}>
                  <p>{type} -</p> <span>{formatCurrency(total)}</span>
                </LegendItem>
              ))}
            </Legend>
          </LegendContainer>
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
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  height: 690px;
`;

const TriangleContainer = styled.div`
  width: 420px;
  border-bottom: 4px solid ${({ theme, color }) => theme[color]};
  position: relative;
  @media (max-width: 540px) {
    width: 220px;
    left: 10px;
  }
  @media (max-width: 420px) {
    border-bottom: none;
    left: 30px;
    &::after {
      content: "";
      width: calc(100% + 60px);
      height: 5px;
      display: block;
      position: absolute;
      left: -60px;
      bottom: 0px;
      background: ${({ theme, color }) => theme[color]};
    }
  }
  @media (max-width: 360px) {
    &::after {

    }
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
    z-index: ${({ data }) => data.zIndex + 1};
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
  }
  @media (max-width: 540px) {
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    &::before {
      width: 50px;
      height: 50px;
      font-size: 14px;
    }
  }
  @media (max-width: 360px) {
    &::before {
      width: 40px;
      height: 40px;
      font-size: 14px;
      ${({ anime }) =>
      anime &&
      css`
        animation: ${keyframes`
          0% {
            transform: translate3d(90px, 0px, 0px);
          }
          100% {
            transform: translate3d(30px, 0px, 0px);
          }
        `} 2s alternate infinite;
      `}
    }
    &::after {
      width: 50px;
      left: -65px;
    }
  }
`;

const ButtonAnime = styled.span`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -600px;
  svg path {
    fill: ${({ theme, color }) => theme[color]};
  }
  @media (max-width: 420px) {
    left: -30px;
  }
`;

const LegendContainer = styled.div`
  position: relative;
  top: -40px;
  @media (max-width: 540px) {
    width: 300px;
    left: -50px;
  }
  @media (max-width: 420px) {
    width: 260px;
    left: -50px;
  }
`;

const Legend = styled.div`
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.draft};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
`;

const LegendTitle = styled.p`
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
`;

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid ${({ theme, color }) => theme[color]};
  }
  @media (max-width: 420px) {
    font-size: 16px;
  }
`;
