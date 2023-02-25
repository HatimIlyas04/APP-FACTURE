import React from "react";
import styled from "styled-components";
import Status from "../Status";
import ButtonTheme from "../Buttons/ButtonTheme";
import ButtonDefault from "../Buttons/ButtonDefault";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  deleteInvoice,
  getEnvoiceById,
} from "../../store/invoice";
import { useNavigate, useParams } from "react-router-dom";

const HeaderSingleInvoice = () => {
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const markToPaid = () => {
    dispatch(changeStatus({ id, status: "paid" }));
  };

  const deleteThisInvoice = () => {
    const confirm = window.confirm("Tem Certeza que deseja deletar");
    if (confirm) {
      dispatch(deleteInvoice(id));
      navigate("/");
    }
  };

  if (!data) return null;
  return (
    <Container>
      <StatusContainer>
        <p>Status</p>
        <Status status={data.status} />
      </StatusContainer>
      <ButtonsContainer>
        <ButtonTheme>Edit</ButtonTheme>
        <ButtonDefault color="delete" onClick={deleteThisInvoice}>
          Delete
        </ButtonDefault>
        <ButtonDefault color="primary" onClick={markToPaid}>
          Mark as Paid
        </ButtonDefault>
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
