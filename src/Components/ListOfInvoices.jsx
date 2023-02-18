import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListOfInvoices = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../data.json");
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);
  console.log(data);

  if (!data) return null;
  return (
    <Container>
      {data.map(({ id, paymentDue, total, status, clientName }) => {
        return (
          <InvoiceItem key={id}>
            <Id>#{id}</Id>
            <Due>{paymentDue}</Due>
            <Name>{clientName}</Name>
            <Total>{total}</Total>
            <Status status={status}>
              <span>{status}</span>
            </Status>
          </InvoiceItem>
        );
      })}
    </Container>
  );
};

export default ListOfInvoices;

const Container = styled.div`
  max-width: 730px;
  margin: 0px auto;
`;

const InvoiceItem = styled.div`
  //display: grid;
  //grid-template-columns: repeat(5, 1fr);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 24px;
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  margin-bottom: 16px;
`;
const Id = styled.p``;
const Due = styled.p``;
const Name = styled.p``;
const Total = styled.p``;
const Status = styled.div`
  color: ${({ theme, status }) => theme.variantColors[status].normal};
  background: ${({ theme, status }) => theme.variantColors[status].hover};
  padding: 12px;
  width: 104px;
  border-radius: 6px;
  span {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    &::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${({ theme, status }) => theme.variantColors[status].normal};
      position: relative;
    }
  }
`;
