import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteInvoice } from "../../store/invoice";
import { closeModal } from "../../store/modal";
import { AnimeScale } from "../../styles/animations";
import ButtonDefault from "../Buttons/ButtonDefault";
import ButtonTheme from "../Buttons/ButtonTheme";

const ConfirmDelete = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelDelete = () => {
    dispatch(closeModal())
  }

  const deleteConfirmed = () => {
    dispatch(deleteInvoice(id));
    dispatch(closeModal())
    navigate("/");
  }

  return (
    <Container>
      <Content>
        <Title>Confirm Deletion</Title>
        <Paragraph>
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </Paragraph>
        <ContainerButtons>
          <ButtonTheme onClick={cancelDelete}>Cancel</ButtonTheme>
          <ButtonDefault color="delete" onClick={deleteConfirmed}>Delete</ButtonDefault>
        </ContainerButtons>
      </Content>
    </Container>
  );
};

export default ConfirmDelete;

const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  padding: 48px;
  border-radius: 8px;
  animation: ${AnimeScale} 0.5s forwards;
  position: fixed;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.title};
  font-size: 32px;
  margin-bottom: 12px;
`;

const Paragraph = styled.p`
  max-width: 48ch;
  margin-bottom: 12px;
  line-height: 22px;
  color: ${({ theme }) => theme.textPrimary};
`;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
