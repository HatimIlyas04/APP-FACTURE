import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Forms/Input";
import DatePicker from "./Forms/DatePicker";
import DropDown from "./Forms/DropDown";
import ButtonItem from "./Buttons/ButtonItem";
import { idGenerator } from "../Helper/idGenerator";
import { ReactComponent as Delete } from "../assets/icon-delete.svg";
import { formatCurrencyNotSymbol } from "../Helper/format";
import ButtonDefault from "./Buttons/ButtonDefault";
import ButtonTheme from "./Buttons/ButtonTheme";
import ButtonDraft from "./Buttons/ButtonDraft";
import useForm from "../Hooks/useForm";

const CreateInvoice = () => {
  const [itemsForm, setItemsForm] = useState([]);
  const forms = {
    sendAddress: useForm(),
    city: useForm(),
  };
  //const sendAddress = useForm();
  //console.log(sendAddress);

  const sendInvoice = (e) => {
    e.preventDefault();
    const value = forms.sendAddress.ref.current.value;
    //console.log(sendAddress.ref.current.value)
    forms.sendAddress.validate(value);
    forms.city.validate(value);
    console.log(forms);
  };

  const AddNewItem = () => {
    const idItem = idGenerator();
    setItemsForm((items) => [
      ...items,
      { id: idItem, name: "", quantity: "", price: "", total: "0.00" },
    ]);
  };

  const removeItem = ({ currentTarget }) => {
    const idItem = currentTarget.dataset.id;
    setItemsForm((item) => item.filter(({ id }) => id !== idItem));
  };

  const handleChangeItems = ({ target }) => {
    const targetId = target.id;
    const type = target.dataset.type;
    setItemsForm((items) =>
      items.reduce((accum, item) => {
        if (targetId.includes(item.id)) {
          item[type] = target.value;
          if (type === "quantity" || type === "price") {
            const empty = item.quantity && item.price ? true : false;
            item.total = empty
              ? formatCurrencyNotSymbol(item.quantity * item.price)
              : "0,00";
          }
          console.log(item[type]);
        }
        return [...items];
      }, {})
    );
  };

  console.log(itemsForm);

  return (
    <Container>
      <Form onSubmit={sendInvoice}>
        <Title>New Invoice</Title>

        <BillTitle>Bill From</BillTitle>
        <Input
          label="Street Address"
          id="sendStreet"
          ref={forms.sendAddress.ref}
          {...forms.sendAddress}
        />
        <AddressFlex>
          <Input
            label="City"
            id="clientStreet"
            ref={forms.city.ref}
            {...forms.city}
          />
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
        {itemsForm.map(({ id, total }) => {
          return (
            <ItemSolo key={id}>
              <Input
                id={`${id}-1`}
                data-type={"name"}
                onChange={handleChangeItems}
              />
              <Input
                id={`${id}-2`}
                data-type={"quantity"}
                onChange={handleChangeItems}
                type="number"
                p="8"
              />
              <Input
                id={`${id}-3`}
                data-type={"price"}
                onChange={handleChangeItems}
                type="number"
              />
              <span>
                <p>{total}</p>
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

        <FormErrors></FormErrors>

        <ButtonsContainer>
          <ButtonTheme type="button" custom={true}>
            Discard
          </ButtonTheme>
          <div>
            <ButtonDraft type="button">Save as Draft</ButtonDraft>
            <ButtonDefault color="primary">Save & Send</ButtonDefault>
          </div>
        </ButtonsContainer>
      </Form>
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

const Form = styled.form`
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

const FormErrors = styled.div``;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div button:first-child {
    margin-right: 8px;
  }
`;
