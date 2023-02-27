import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CreateInvoice from "../CreateInvoice/CreateInvoice";
import HeaderMenu from "./HeaderMenu";
import ListOfInvoices from "./ListOfInvoices";

const Home = () => {
  const { modal } = useSelector((state) => state.modal);

  return (
    <Container>
      <HeaderMenu />
      <ListOfInvoices />
      {modal && <CreateInvoice />}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  position: relative;
  @media (max-width: 800px) {
    
  }
`;
