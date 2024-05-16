import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMedia from "../../Hooks/useMedia";
import styled, { css, keyframes } from "styled-components";
import { formatCurrency } from "../../Helper/format";

const TriangleChart = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);
  const mobile = useMedia("(max-width: 540px)");
  const [valueForStatus, setValueForStatus] = useState([]);
  const [triangleData, setTriangleData] = useState([]);
  const [containerHeight, setContainerHeight] = useState(490);

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

  const changeHeightContainer = (percent) => {
    if (percent >= 60) {
      setContainerHeight(() => 560);
    }
  };

  const genetareHeight = (percent) => {
    let height = percent * (mobile ? 3 : 4);
    height = height > 300 ? 300 : height;
    height = height < 60 ? 60 : height;
    return height;
  };

  const calculatePercentage = (value, total) =>
    Math.floor((value / total) * 100);

  useEffect(() => {
    const total = valueForStatus.reduce((accum, { total }) => accum + total, 0);
    const sortStatus = valueForStatus.sort((a, b) => a.total - b.total);
    const dataOfTriangle = sortStatus.map((item, i) => {
      const percent = calculatePercentage(item.total, total);
      changeHeightContainer(percent);
      const height = genetareHeight(percent);
      const zIndex = i === 0 ? 100 : i === 1 ? 50 : 10;
      let left = i === 1 ? 120 : i === 2 ? 220 : 0;
      if (mobile) {
        left = i === 1 ? 60 : i === 2 ? 120 : 0;
      }
      return {
        ...item,
        left,
        height,
        zIndex,
        percentage: calculatePercentage(item.total, total) || 0,
      };
    });
    setTriangleData(() => dataOfTriangle);
  }, [valueForStatus, mobile]);

  return (
<Container>
  <GraphContainer height={containerHeight}>
    <TriangleContainer color={triangleData[2]?.type}>
      {triangleData.map((data) => (
        <Triangle key={data.type} data={data} />
      ))}
      <LegendContainer>
        <LegendTitle>Valeur du statut</LegendTitle>
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
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadowPrimary};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  height: ${({ height }) => height}px;
`;

const TriangleContainer = styled.div`
  width: 420px;
  border-bottom: 4px solid ${({ theme, color }) => theme[color]};
  position: relative;
  @media (max-width: 540px) {
    width: 220px;
    //left: 10px;
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background: ${({ theme, data }) => theme[data.type]};
    position: absolute;
    top: -20px;
    left: -90px;
    z-index: ${({ data }) => data.zIndex + 1};
    font-size: 12px;
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
      left: -50px;
    }
    &::after {
      display: none;
    }
  }
  @media (max-width: 360px) {
  }
`;

const LegendContainer = styled.div`
  position: relative;
  @media (max-width: 540px) {
    width: 300px;
    left: -45px;
  }
  @media (max-width: 420px) {
    width: 240px;
    left: -10px;
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
