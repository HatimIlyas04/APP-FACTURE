import React, { useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import ButtonInvoice from "../Buttons/ButtonInvoice";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal";

const HeaderMenu = () => {
  const [filterValues, setFilterValues] = useState(["draft"]);
  console.log(filterValues);
  const dispatch = useDispatch();
  const open = () => {
    dispatch(openModal());
  };

  return (
    <Container>
      <TitleContainer>
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </TitleContainer>
      <Content>
        <Filter value={filterValues} setValue={setFilterValues} />
        <ButtonInvoice onClick={open}>New Invoice</ButtonInvoice>
      </Content>
    </Container>
  );
};

export default HeaderMenu;

const Container = styled.div`
  max-width: 730px;
  margin: 40px auto 65px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin-bottom: 8px;
  }
`;

const TitleContainer = styled.div`
  h1 {
    font-size: 32px;
  }
  p {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
