import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const GraphPieChart = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);
  const [invoicesForStatus, setInvoicesForStatus] = useState({
    paid: [],
    pending: [],
    draft: [],
  });
  const [percentageOfStatus, setPercentageOfStatus] = useState([]);

  useEffect(() => {
    invoices.forEach((invoice) => {
      setInvoicesForStatus((invoices) => ({
        ...invoices,
        [invoice.status]: [...invoices[invoice.status], invoice],
      }));
    });
  }, []);

  const calculatePercentage = (value, total) => (value / total) * 100;

  const calculateDeg = (percentages) => {
    const array = percentages.sort((a, b) => a.value - b.value);
    const degs = array.map((item) => ({
      ...item,
      value: (item.value / 100) * 360,
    }));
    degs[1].value += degs[0].value;
    degs[2].value += degs[1].value;
    return degs;
  };

  const getPercentage = () => {
    let total = 0;
    for (const key in invoicesForStatus) {
      total += invoicesForStatus[key].length;
    }
    const calcule = (status) =>
      calculatePercentage(invoicesForStatus[status].length, total);
    const percentages = [
      {
        type: "paid",
        value: calcule("paid"),
      },
      {
        type: "pending",
        value: calcule("pending"),
      },
      {
        type: "draft",
        value: calcule("draft"),
      },
    ];
    setPercentageOfStatus(() => calculateDeg(percentages));
  };

  useEffect(() => {
    getPercentage();
  }, [invoicesForStatus]);

  const getValueforType = (status) => {
    console.log(status)
    if(percentageOfStatus[0]?.value)  {
      const type = percentageOfStatus.filter(({type}) => type === status);
      return type[0].value
    }
  };
  console.log(percentageOfStatus);

  return (
    <Container>
      <GraphContainer>
        <Graph1 small={percentageOfStatus[0]} mid={percentageOfStatus[1]} big={percentageOfStatus[2]} />
        <Graph2 />
      </GraphContainer>
    </Container>
  );
};

export default GraphPieChart;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  //background: ${({theme}) => theme['paid']};
`;

const GraphContainer = styled.div`

`;

const Graph1 = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: conic-gradient(
    ${({theme, small}) => theme[small?.type]} 1deg ${({small}) => small?.value}deg,
    ${({theme, mid}) => theme[mid?.type]} 1deg ${({mid}) => mid?.value}deg,
    ${({theme, big}) => theme[big?.type]} 1deg ${({big}) => big?.value}deg
  );
`;

const Graph2 = styled.div`
  width: 100px;
  height: 100px;
`;

const Center = styled.div`
  background: #fff;
`;
