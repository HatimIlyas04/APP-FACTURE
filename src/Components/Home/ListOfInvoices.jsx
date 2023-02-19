import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowRight } from "../../assets/icon-arrow-right.svg";
import { formartDate } from "../../Helper/formatDate";
import InvoiceEmpty from "./InvoiceEmpty";
import Status from "../Status";

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

  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const format = (date) => date.split("-").reverse().join("-");

  if (!data) return null;
  if (data.length === 0) return <InvoiceEmpty />;
  return (
    <Container>
      {data.map(({ id, paymentDue, total, status, clientName }) => {
        return (
          <InvoiceItem key={id}>
            <Id>
              {" "}
              <span>#</span>
              {id}
            </Id>
            <Due>Due {formartDate(format(paymentDue))}</Due>
            <Name>{clientName}</Name>
            <Total>{formatCurrency(total)}</Total>
            <LastColumn>
              <Status status={status} />
              <ArrowRight />
            </LastColumn>
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
  display: grid;
  grid-template-columns: auto repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 24px;
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;
  &:hover {
    border-color: ${({ theme }) => theme.variantColors.primary.normal};
  }
`;
const Id = styled.p`
  font-weight: 700;
  span {
    color: ${({ theme }) => theme.variantColors.primary.normal};
  }
`;
const Due = styled.p`
  color: ${({ theme }) =>
    theme.name === "light"
      ? theme.variantColors.primary.normal
      : theme.textPrimary};
`;
const Name = styled.p`
  color: ${({ theme }) => theme.textTertiary};
`;
const Total = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const LastColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
