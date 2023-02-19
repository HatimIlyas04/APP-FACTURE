import React from "react";
import styled from "styled-components";
import { ReactComponent as EmptyImg } from "../../assets/illustration-empty.svg";

const InvoiceEmpty = () => {
  return (
    <Container>
      <ImgContainer>
        <EmptyImg />
      </ImgContainer>
      <Title>There is nothing here</Title>
      <EmptyParagraph>
        Create an invoice by clicking the <span>New Invoice </span> button and
        get started
      </EmptyParagraph>
    </Container>
  );
};

export default InvoiceEmpty;

const Container = styled.div`
  max-width: 730px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const ImgContainer = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
`;
const EmptyParagraph = styled.p`
  max-width: 26ch;
  text-align: center;
  line-height: 15px;
  color: ${({ theme }) => theme.textPrimary};
  span {
    font-weight: 700;
  }
`;
