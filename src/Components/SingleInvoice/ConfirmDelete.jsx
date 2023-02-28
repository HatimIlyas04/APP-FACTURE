import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteInvoice } from "../../store/invoice";
import { AnimeScale } from "../../styles/animations";
import ButtonDefault from "../Buttons/ButtonDefault";
import ButtonTheme from "../Buttons/ButtonTheme";

const ConfirmDelete = ({ setShowDelete }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelDelete = () => {
    setShowDelete((state) => (state = false));
  };

  const deleteConfirmed = () => {
    dispatch(deleteInvoice(id));
    navigate("/");
  };

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
          <ButtonDefault color="delete" onClick={deleteConfirmed}>
            Delete
          </ButtonDefault>
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
  padding: 0px 20px;
`;

const Content = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  padding: 48px;
  border-radius: 8px;
  animation: ${AnimeScale} 0.5s forwards;
  position: fixed;
  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.title};
  font-size: 32px;
  margin-bottom: 12px;
  @media (max-width: 600px) {
    font-size: 28px;
  }
  @media (max-width: 370px) {
    text-align: center;
    font-size: 24px;
  }
`;

const Paragraph = styled.p`
  max-width: 48ch;
  margin-bottom: 12px;
  line-height: 22px;
  color: ${({ theme }) => theme.textPrimary};
  @media (max-width: 600px) {
    max-width: 32ch;
  }
  @media (max-width: 370px) {
    max-width: 24ch;
    text-align: center;
    margin-bottom: 24px;
  }
`;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
