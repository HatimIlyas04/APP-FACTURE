import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import HeaderSingleInvoice from "./HeaderSingleInvoice";
import UniqueInvoiceData from "./UniqueInvoiceData";
import { Link, useParams } from "react-router-dom";
import { getEnvoiceById } from "../../store/invoice";
import { useSelector } from "react-redux";
import ConfirmDelete from "./ConfirmDelete";
import CreateInvoice from "../CreateInvoice/CreateInvoice";
import useMedia from "../../Hooks/useMedia";
import ButtonsContainer from "./ButtonsContainer";
import { AnimeLeft } from "../../styles/animations";

const SingleInvoice = () => {
  const mobile = useMedia("(max-width: 700px)");
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id));
  const { modal } = useSelector((state) => state.modal);
  const [showDelete, setShowDelete] = useState(false);

  if (data === null) return null;
  return (
    <MainBg>
      <Container>
        <Link to="/">
          <Back>
            <ArrowLeft />
            Retour
          </Back>
        </Link>
        <HeaderSingleInvoice setShowDelete={setShowDelete} />
        <Content>
          <UniqueInvoiceData />
        </Content>
      </Container>
      {mobile && (
        <ButtonsInMobile>
          <ButtonsContainer setShowDelete={setShowDelete} />
        </ButtonsInMobile>
      )}
      {showDelete && <ConfirmDelete setShowDelete={setShowDelete} />}
      {modal && <CreateInvoice />}
    </MainBg>
  );
};

export default SingleInvoice;

const MainBg = styled.main`
  width: 100%;
  position: relative;
  height: 100%;
`;

const Container = styled.div`
  max-width: 800px;  /* Set a maximum width */
  width: 100%;  /* Allow it to take full width up to the maximum */
  margin: 0 auto;  /* Center the container */
  margin-top: 40px;
  @media (max-width: 800px) {
    padding: 0 18px;
  }
`;

const Back = styled.button`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  animation: ${AnimeLeft} 0.5s forwards;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
  svg {
    margin-right: 20px;
  }
`;

const Content = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: ${({ theme }) => theme.shadowSecundary};
  border-radius: 8px;
  margin-top: 30px;
  animation: ${AnimeLeft} 1s forwards;
`;

const ButtonsInMobile = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  padding: 22px 12px;
  display: flex;
  justify-content: space-between;
`;
