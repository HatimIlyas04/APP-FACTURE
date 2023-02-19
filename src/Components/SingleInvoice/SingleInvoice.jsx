import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import HeaderSingleInvoice from "./HeaderSingleInvoice";

const SingleInvoice = () => {
  return (
    <MainBg>
      <Container>
        <Back>
          <ArrowLeft />
          Go Back
        </Back>
        <HeaderSingleInvoice />
      </Container>
    </MainBg>
  );
};

export default SingleInvoice;

const MainBg = styled.main`
  width: 100%;
`;

const Container = styled.main`
  max-width: 730px;
  margin: 0 auto;
  margin-top: 30px;
`;

const Back = styled.button`
  margin-bottom: 32px;
  display: flex;
  gap: 20px;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
`;
