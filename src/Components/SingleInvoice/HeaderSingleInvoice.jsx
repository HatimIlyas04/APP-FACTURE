import React from "react";
import styled from "styled-components";
import Status from "../Status";
import ButtonTheme from "../Buttons/ButtonTheme";
import ButtonDefault from "../Buttons/ButtonDefault";

const HeaderSingleInvoice = () => {
  return (
    <Container>
      <StatusContainer>
        <p>Status</p>
        <Status status="pending" />
      </StatusContainer>
      <ButtonsContainer>
        <ButtonTheme>Edit</ButtonTheme>
        <ButtonDefault color="delete">Delete</ButtonDefault>
        <ButtonDefault color="primary">Mark as Paid</ButtonDefault>
      </ButtonsContainer>
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
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
