import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowRight } from "../../assets/icon-arrow-right.svg";
import { formatCurrency, formatDate } from "../../Helper/format";
import InvoiceEmpty from "./InvoiceEmpty";
import Status from "../Status";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEnvoicesByStatus } from "../../store/invoice";
import useMedia from "../../Hooks/useMedia";
import { AnimeLeft } from "../../styles/animations";

const ListOfInvoices = () => {
  const mobile = useMedia("(max-width: 700px)");
  const invoices = useSelector(({ invoices }) => getEnvoicesByStatus(invoices));

  const format = (date) => date.split("-").reverse().join("-");

  if (!invoices) return null;
  if (invoices.length === 0) return <InvoiceEmpty />;
  return (
    <Container>
      {invoices.map(({ id, paymentDue, total, status, clientName }) => {
        return (
          <Link to={`invoice/${id}`} key={id}>
            <InvoiceItem>
              <Id>
                <span>#</span>
                {id}
              </Id>
              <Due>Due {formatDate(format(paymentDue))}</Due>
              <Name>{clientName}</Name>
              <Total>{formatCurrency(total)}</Total>
              <LastColumn>
                <Status status={status} />
                {!mobile && <ArrowRight />}
              </LastColumn>
            </InvoiceItem>
          </Link>
        );
      })}
    </Container>
  );
};

export default ListOfInvoices;

const Container = styled.div`
  max-width: 750px;
  margin: 0px auto;
  padding: 0px 18px 18px 110px;
  a {
    color: ${({ theme }) => theme.title};
  }
  @media (max-width: 800px) {
    padding-left: 18px;
  }
`;

const InvoiceItem = styled.div`
  display: grid;
  grid-template-columns: auto auto repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: 0px 2px 5px rgba(76, 78, 100, 0.22);
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;
  animation: ${AnimeLeft} 0.5s forwards;
  &:hover {
    border-color: ${({ theme }) => theme.variantColors.primary.normal};
  }
  @media (max-width: 700px) {
    grid-template-columns: 2fr;
    gap: 8px;
  }
`;
const Id = styled.p`
  font-weight: 700;
  span {
    color: ${({ theme }) => theme.variantColors.primary.normal};
  }
  @media (max-width: 700px) {
    margin-bottom: 8px;
  }
`;
const Due = styled.p`
  font-size: 14px;
  color: ${({ theme }) =>
    theme.name === "light"
      ? theme.variantColors.primary.normal
      : theme.textPrimary};
  @media (max-width: 700px) {
    grid-column: 1;
    grid-row: 2;
  }
`;
const Name = styled.p`
  color: ${({ theme }) => theme.textTertiary};
  @media (max-width: 700px) {
    grid-column: 2;
    grid-row: 1;
    justify-self: flex-end;
  }
`;
const Total = styled.p`
  font-size: 20px;
  font-weight: 700;
  @media (max-width: 700px) {
    grid-column: 1;
    grid-row: 3;
  }
`;

const LastColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 700px) {
    grid-column: 2;
    grid-row: 2 / 4;
    justify-self: flex-end;
  }
`;
