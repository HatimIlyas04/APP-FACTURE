import React from "react";
import styled from "styled-components";
import CreateInvoice from "../CreateInvoice";
import HeaderMenu from "./HeaderMenu";
import ListOfInvoices from "./ListOfInvoices";

const Home = () => {
  return (
    <Container>
      <HeaderMenu />
      <ListOfInvoices />
      <CreateInvoice />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  position: relative;
`;
