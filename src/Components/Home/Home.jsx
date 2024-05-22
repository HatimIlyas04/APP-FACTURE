import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useMedia from "../../Hooks/useMedia";
import CreateInvoice from "../CreateInvoice/CreateInvoice";
import HeaderMenu from "./HeaderMenu";
import ListOfInvoices from "./ListOfInvoices"; 
 
const Home = () => {   
  const { modal } = useSelector((state) => state.modal);
  const mobile = useMedia("(max-width: 700px)");
  const show = mobile && modal
   
  return (
    <Container>
      <HeaderMenu />
      {!show && <ListOfInvoices />} 
      {modal && <CreateInvoice />}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  position: relative;
  min-height: 100vh;
  height: 100%;
`;
