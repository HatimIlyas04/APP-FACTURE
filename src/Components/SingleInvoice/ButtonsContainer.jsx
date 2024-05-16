import React from "react";
import ButtonTheme from "../Buttons/ButtonTheme";
import ButtonDefault from "../Buttons/ButtonDefault";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeStatus, getEnvoiceById } from "../../store/invoice";
import { openModal } from "../../store/modal";

const ButtonsContainer = ({ setShowDelete }) => {
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id));
  const dispatch = useDispatch();

  const markToPaid = () => {
    dispatch(changeStatus({ id, status: "paid" }));
  };

  const deleteThisInvoice = () => {
    setShowDelete((state) => (state = true));
  };

  const editInvoice = () => {
    dispatch(openModal());
  };

  return (
<Container>
  <ButtonTheme onClick={editInvoice}>Modifier</ButtonTheme>
  <ButtonDefault color="delete" onClick={deleteThisInvoice}>
    Supprimer
  </ButtonDefault>
  <ButtonDefault color="primary" onClick={markToPaid}>
    Marquer comme payé
  </ButtonDefault>
</Container>
  );
};

export default ButtonsContainer;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;
