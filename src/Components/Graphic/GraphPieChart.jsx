import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AnimeLeft, AnimeRotate } from "../../styles/animations";

const GraphPieChart = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);
  const [invoicesForStatus, setInvoicesForStatus] = useState({});
  const pieRef = useRef(null);
  const [statusInDeg, setStatusInDeg] = useState([]);
  const [statusInPercentage, setStatusInPercentage] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0 });
  const [tooltipCurrentData, setTooltipCurrentData] = useState({});
  const circleCenter = useRef(null);

  useEffect(() => {
    const data = invoices.reduce(
      (accum, { status }) => ({
        ...accum,
        [status]: (accum[status] || 0) + 1,
      }),
      {}
    );
    setInvoicesForStatus(() => data);
  }, []);

  const calculatePercentage = (value, total) =>
    Math.floor((value / total) * 100);

  const calculateDeg = (percentages) => {
    const array = percentages.sort((a, b) => a.value - b.value);
    const degs = array.map((item) => ({
      ...item,
      value: Math.floor((item.value / 100) * 360),
    }));
    degs[1].value += degs[0].value;
    degs[2].value += degs[1].value;
    return degs;
  };

  const getPercentage = () => {
    let total = 0;
    for (const key in invoicesForStatus) {
      total += invoicesForStatus[key];
    }
    const calcule = (status) =>
      calculatePercentage(invoicesForStatus[status], total);
    const percentages = [
      {
        type: "paid",
        value: calcule("paid") || 0,
      },
      {
        type: "pending",
        value: calcule("pending") || 0,
      },
      {
        type: "draft",
        value: calcule("draft") || 0,
      },
    ];
    setStatusInDeg(() => calculateDeg(percentages));
    setStatusInPercentage(() => percentages);
  };

  useEffect(() => {
    getPercentage();
  }, [invoicesForStatus]);

  const getCoordsOfMouse = (e) => {
    let clientX = e.clientX  + 20
    if(clientX + 260 > window.innerWidth) {
      clientX -= 140
    }
    const test = e.target === circleCenter?.current ? false : true;
    test ? setShowTooltip(() => true) : setShowTooltip(() => false);
    setTooltipCoords(() => ({ x: clientX, y: e.clientY + 20 }));
  };

  const handleMouseLeave = () => {
    setShowTooltip(() => false);
  };

  const getColorByMouseMove = (e) => {
    getCoordsOfMouse(e);
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Obtém a posição da div em relação à janela
    const rect = pieRef?.current.getBoundingClientRect();
    const divX = rect.left;
    const divY = rect.top;

    // Calcula a posição do mouse em relação à div
    const x = mouseX - divX;
    const y = mouseY - divY;

    // Obtém a geometria da div
    const width = pieRef?.current.offsetWidth;
    const height = pieRef?.current.offsetHeight;

    const angle = Math.atan2(y - height / 2, x - width / 2);
    let degrees = (angle * 180) / Math.PI + 90;
    degrees -= degrees > 360 ? 360 : 0;


    if (degrees < statusInDeg[0].value && degrees > 0) {
      getDataForStatus(statusInDeg[0].type);
    } else if (degrees < statusInDeg[1].value && degrees > 0) {
      getDataForStatus(statusInDeg[1].type);
    } else {
      getDataForStatus(statusInDeg[2].type);
    }
  };

  const getDataForStatus = (status) => {
    const value = invoicesForStatus[status];
    setTooltipCurrentData(() => ({ type: status, value }));
  };


  return (
<Container>
  <GraphContainer>
    <PieChartContainer>
      <PieChart
        small={statusInDeg[0]}
        mid={statusInDeg[1]}
        big={statusInDeg[2]}
        onMouseMove={getColorByMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={getColorByMouseMove}
        onTouchEnd={handleMouseLeave}
        ref={pieRef}
      >
        <Center ref={circleCenter} />
      </PieChart>
      {showTooltip && (
        <Tooltip coords={tooltipCoords} color={tooltipCurrentData.type}>
          Total : {tooltipCurrentData.value}
        </Tooltip>
      )}
    </PieChartContainer>
    <LegendContainer>
      <LegendTitle>Quantité par statut</LegendTitle>
      <Legend>
        {statusInPercentage.map(({ type, value }) => (
          <LegendItem key={type} color={type}>
            <p>{type}</p> <span>{value}%</span>
          </LegendItem>
        ))}
      </Legend>
    </LegendContainer>
  </GraphContainer>
</Container>
  );
};

export default GraphPieChart;

const checkIfOnly1Status = (a, b, c) => {
  return (a === 0) + (b === 0) + (c === 0) === 2;
};

const getGradient = ({ theme, small, mid, big }) => {
  const sValue = small?.value;
  const mValue = mid?.value;
  const bValue = big?.value;
  const oneStatus = checkIfOnly1Status(sValue, mValue, bValue);

  return `
    background: conic-gradient(
      ${oneStatus ? theme[big?.type] : theme.bgPrimary} 1deg ${
    oneStatus ? bValue : 4
  }deg,
      ${theme[small?.type]} ${sValue ? 1 : 0}deg ${sValue}deg,
      ${theme.bgPrimary} 1deg ${sValue + 4}deg,
      ${theme[mid?.type]} ${mValue ? 1 : 0}deg ${mValue}deg,
      ${theme.bgPrimary} 1deg ${mValue + 4}deg,
      ${theme[big?.type]} ${bValue ? 1 : 0}deg ${bValue}deg
    );
  `;
};

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 90px;
  padding: 30px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadowPrimary};
  border-radius: 20px;
  @media (max-width: 680px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const PieChartContainer = styled.div`

`;

const PieChart = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: relative;
  transition: 0.5s ease-in-out;
  animation: ${AnimeRotate} 2s forwards 2 linear;
  ${(props) => getGradient(props)}
  @media (max-width: 500px) {
    width: 200px;
    height: 200px;
  }
`;

const Center = styled.div`
  background: ${({ theme }) => theme.bgPrimary};
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  top: 50px;
  right: 50px;
  transition: 0.5s ease-in-out;
  @media (max-width: 500px) {
    width: 120px;
    height: 120px;
    top: 40px;
    right: 40px;
  }
`;

const Tooltip = styled.span.attrs(props => ({
  style: {
    background: props.theme[props.color],
    top: props.coords.y + 'px',
    left: props.coords.x + 'px'
  }
}))`
  width: 100px;
  height: 50px;
  border-radius: 12px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  color: #fff;
  animation: ${AnimeLeft} 0.5s;
`;


const LegendContainer = styled.div``;

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
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme, color }) => theme[color]};
  }
`;
