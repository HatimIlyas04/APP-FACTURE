import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import HeaderSingleInvoice from "./HeaderSingleInvoice";
import UniqueInvoiceData from "./UniqueInvoiceData";
import { Link, useParams } from "react-router-dom";
import { getEnvoiceById } from "../../store/invoice";
import { useSelector } from "react-redux";
import ConfirmDelete from "./ConfirmDelete";

const SingleInvoice = () => {
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id));
  const { modal } = useSelector((state) => state.modal);

  if (data === null) return null;
  return (
    <MainBg>
      <Container>
        <Link to="/">
          <Back>
            <ArrowLeft />
            Go Back
          </Back>
        </Link>
        <HeaderSingleInvoice />
        <Content>
          <UniqueInvoiceData />
        </Content>
      </Container>
      {modal && <ConfirmDelete />}
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
  cursor: pointer;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
`;

const Content = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: ${({ theme }) => theme.shadowSecundary};
  border-radius: 8px;
  margin-top: 30px;
`;
