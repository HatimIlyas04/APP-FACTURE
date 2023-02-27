import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "../Filter";
import ButtonInvoice from "../Buttons/ButtonInvoice";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modal";
import { changeFilters } from "../../store/invoice";

const HeaderMenu = () => {
  const { invoices } = useSelector(({invoices}) => invoices)
  const [filterValues, setFilterValues] = useState([]);
  console.log(filterValues);
  const dispatch = useDispatch();
  const open = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(changeFilters(filterValues))
  }, [filterValues])

  return (
    <Container>
      <TitleContainer>
        <h1>Invoices</h1>
        <p>There are {invoices.length} total invoices</p>
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
  padding: 0px 10px;
  padding-left: 92px;
  h1 {
    margin-bottom: 8px;
  }
  @media (max-width: 800px) {
    padding-left: 10px;
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
  @media (max-width: 800px) {
    gap: 10px;
  }
`;
