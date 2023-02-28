import React from "react";
import styled from "styled-components";
import Status from "../Status";
import { useSelector } from "react-redux";
import { getEnvoiceById } from "../../store/invoice";
import { useParams } from "react-router-dom";
import useMedia from "../../Hooks/useMedia";
import ButtonsContainer from "./ButtonsContainer";
import { AnimeLeft } from "../../styles/animations";

const HeaderSingleInvoice = ({ setShowDelete }) => {
  const mobile = useMedia("(max-width: 700px)");
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id));

  if (!data) return null;
  return (
    <Container>
      <StatusContainer>
        <p>Status</p>
        <Status status={data.status} />
      </StatusContainer>
      {!mobile && <ButtonsContainer setShowDelete={setShowDelete} />}
    </Container>
  );
};

export default HeaderSingleInvoice;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  border-radius: 8px;
  animation: ${AnimeLeft} 0.7s forwards;
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: ${({ theme }) => theme.shadowSecundary};
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  & p {
    color: ${({ theme }) => theme.textPrimary};
  }
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-between;
  }
`;
