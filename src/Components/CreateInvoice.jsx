import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Forms/Input";
import DatePicker from "./Forms/DatePicker";
import DropDown from "./Forms/DropDown";
import ButtonItem from "./Buttons/ButtonItem";
import { idGenerator } from "../Helper/idGenerator";
import { ReactComponent as Delete } from "../assets/icon-delete.svg";

const CreateInvoice = () => {
  const [items, setItems] = useState([]);
  const [itemsForm, setItemsForm] = useState([
    {
      id: "",
      name: "",
      quantity: "",
      price: "",
    },
  ]);

  const AddNewItem = () => {
    const idItem = idGenerator();
    setItems((items) => [...items, { id: idItem }]);
  };

  const removeItem = ({ currentTarget }) => {
    const idItem = currentTarget.dataset.id;
    setItems((item) => item.filter(({ id }) => id !== idItem));
  };

  console.log(items);

  return (
    <Container>
      <Content>
        <Title>New Invoice</Title>

        <BillTitle>Bill From</BillTitle>
        <Input label="Street Address" id="sendStreet" />
        <AddressFlex>
          <Input label="City" id="clientStreet" />
          <Input label="Post Code" id="senPostCode" />
          <Input label="Country" id="senCountry" />
        </AddressFlex>

        <BillTitle>Bill To</BillTitle>
        <Input label="Client´s Name" id="clientName" />
        <Input
          label="Client´s Email"
          id="clientEmail"
          placeholder="e.g. email@example.com"
        />
        <Input label="Street Address" id="ClientStreet" />

        <AddressFlex>
          <Input label="City" id="clientStreet" />
          <Input label="Post Code" id="senPostCode" />
          <Input label="Country" id="senCountry" />
        </AddressFlex>

        <ContentDropDownInputs>
          <ContainerForInput>
            <PseudoLabel>Invoice Date</PseudoLabel>
            <DatePicker />
          </ContainerForInput>
          <ContainerForInput>
            <PseudoLabel>Payment Terms</PseudoLabel>
            <DropDown />
          </ContainerForInput>
        </ContentDropDownInputs>

        <Input
          label="Project Description"
          id="description"
          placeholder="e.g. Graphic Design Service"
        />

        <ItemListTitle>Item List</ItemListTitle>
        <ItemGridLabel>
          <p>Item Name</p>
          <p>Qty.</p>
          <p>Price</p>
          <p>Total</p>
        </ItemGridLabel>
        {items.map(({ id }) => {
          return (
            <ItemSolo key={id}>
              <Input />
              <Input />
              <Input />
              <span>
                <p>11223</p>
                <DeleteContainer data-id={id} onClick={removeItem}>
                  <Delete />
                </DeleteContainer>
              </span>
            </ItemSolo>
          );
        })}
        <ButtonItem type="button" onClick={AddNewItem}>
          + Add New Item
        </ButtonItem>
      </Content>
    </Container>
  );
};

export default CreateInvoice;

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.form`
  overflow-y: scroll;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgPrimary};
  width: 50%;
  height: 100%;
  padding: 46px 46px 240px 136px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.title};
  margin-bottom: 12px;
`;

const BillTitle = styled.p`
  color: ${({ theme }) => theme.variantColors.primary.normal};
`;

const AddressFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
`;

const ContentDropDownInputs = styled.div`
  display: flex;
  gap: 20px;
`;

const ContainerForInput = styled.div`
  width: 100%;
`;

const PseudoLabel = styled.p`
  display: inline-block;
  margin-bottom: 10px;
  color: ${({ theme }) =>
    theme.name === "light" ? theme.textSecundary : theme.textPrimary};
`;

const ItemListTitle = styled.p`
  color: ${({ theme }) => theme.constPrimary};
  font-size: 22px;
  font-weight: 700;
`;

const ItemSolo = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 2fr 2fr;
  align-items: center;
  gap: 16px;
  span {
    display: flex;
    justify-content: end;
    gap: 32px;
  }
`;

const DeleteContainer = styled.div`
  cursor: pointer;
`;

const ItemGridLabel = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 2fr 2fr;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) =>
    theme.name === "light" ? theme.textSecundary : theme.textPrimary};
`;
