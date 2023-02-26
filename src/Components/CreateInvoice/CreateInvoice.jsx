import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "../Forms/Input";
import DatePicker from "../Forms/DatePicker";
import DropDown from "../Forms/DropDown";
import { idGenerator } from "../../Helper/idGenerator";
import {
  addDate,
  formatDate,
  formatDateToNumbers,
  getCurrentDate,
} from "../../Helper/format";
import ButtonDefault from "../Buttons/ButtonDefault";
import ButtonTheme from "../Buttons/ButtonTheme";
import ButtonDraft from "../Buttons/ButtonDraft";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewInvoice } from "../../store/invoice";
import { closeModal } from "../../store/modal";
import ItemList from "./ItemList";

const CreateInvoice = () => {
  const [itemsForm, setItemsForm] = useState([]);
  const [formsValue, setFormsValue] = useState({});
  const date = useRef(null);
  const [paymentTerms, setPaymentTerms] = useState(null);
  const [valid, setValid] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const forms = {
    clientName: useForm(),
    clientEmail: useForm(),
    description: useForm(),
    senderAddress: {
      city: useForm(),
      street: useForm(),
      postCode: useForm(),
      country: useForm(),
    },
    clientAddress: {
      street: useForm(),
      city: useForm(),
      postCode: useForm(),
      country: useForm(),
    },
  };

  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log(store);

  const validateAllFormInputs = (verify) => {
    const allValidate = [];
    for (const key in forms) {
      if (!forms[key]?.ref) {
        for (const address in forms[key]) {
          const value = forms[key][address].ref.current.value;
          verify && allValidate.push(forms[key][address].validate(value));
          setFormsValue((values) => ({
            ...values,
            [key]: { ...values[key], [address]: value },
          }));
        }
      } else {
        const value = forms[key].ref.current.value;
        verify && allValidate.push(forms[key].validate(value));
        const total = itemsForm.reduce((accum, { quantity, price }) => {
          accum += price * quantity;
          return accum;
        }, 0);
        setFormsValue((values) => ({
          ...values,
          [key]: value,
          items: [...itemsForm],
          total,
        }));
      }
    }
    verify && setValid((prev) => allValidate.every((valid) => valid));
  };

  console.log(formsValue);

  useEffect(() => {
    if (valid) {
      dispatch(addNewInvoice(formsValue));
      dispatch(closeModal());
    }
  }, [formsValue]);

  const getDates = () => {
    let finalDate = date?.current?.value;
    if (!finalDate) {
      finalDate = formatDate(getCurrentDate());
    }
    const paymentDue = addDate(finalDate, paymentTerms.value);
    return {
      createdAt: formatDateToNumbers(finalDate),
      paymentDue,
      paymentTerms: paymentTerms.value,
    };
  };

  const sendInvoice = (e) => {
    e.preventDefault();
    validateAllFormInputs(true);
    setFormsValue((values) => ({
      ...values,
      id: idGenerator(),
      status: "pending",
      ...getDates(),
    }));
  };

  const saveToDraft = () => {
    validateAllFormInputs(false);
    setFormsValue((values) => ({
      ...values,
      id: idGenerator(),
      status: "draft",
      ...getDates(),
    }));
    setIsDraft((state) => state = true)
  };

  useEffect(() => {
    if(isDraft) {
    dispatch(addNewInvoice(formsValue));
    dispatch(closeModal());
    }
  }, [isDraft])

  const close = () => {
    dispatch(closeModal());
  };

  return (
    <Container>
      <Form onSubmit={sendInvoice}>
        <Content>
          <Title>New Invoice</Title>

          <BillTitle>Bill From</BillTitle>
          <Input
            label="Street Address"
            id="sendStreet"
            ref={forms.senderAddress.street.ref}
            {...forms.senderAddress.street}
          />
          <AddressFlex>
            <Input
              label="City"
              id="clientStreet"
              ref={forms.senderAddress.city.ref}
              {...forms.senderAddress.city}
            />
            <Input
              label="Post Code"
              id="sendPostCode"
              ref={forms.senderAddress.postCode.ref}
              {...forms.senderAddress.postCode}
            />
            <Input
              label="Country"
              id="sendCountry"
              ref={forms.senderAddress.country.ref}
              {...forms.senderAddress.country}
            />
          </AddressFlex>

          <BillTitle>Bill To</BillTitle>
          <Input
            label="Client´s Name"
            id="clientName"
            ref={forms.clientName.ref}
            {...forms.clientName}
          />
          <Input
            label="Client´s Email"
            id="clientEmail"
            placeholder="e.g. email@example.com"
            ref={forms.clientEmail.ref}
            {...forms.clientEmail}
          />
          <Input
            label="Street Address"
            id="ClientStreet"
            ref={forms.clientAddress.street.ref}
            {...forms.clientAddress.street}
          />

          <AddressFlex>
            <Input
              label="City"
              id="clientStreet"
              ref={forms.clientAddress.city.ref}
              {...forms.clientAddress.city}
            />
            <Input
              label="Post Code"
              id="clientPostCode"
              ref={forms.clientAddress.postCode.ref}
              {...forms.clientAddress.postCode}
            />
            <Input
              label="Country"
              id="clientCountry"
              ref={forms.clientAddress.country.ref}
              {...forms.clientAddress.country}
            />
          </AddressFlex>

          <ContentDropDownInputs>
            <ContainerForInput>
              <PseudoLabel>Invoice Date</PseudoLabel>
              <DatePicker ref={date} />
            </ContainerForInput>
            <ContainerForInput>
              <PseudoLabel>Payment Terms</PseudoLabel>
              <DropDown setValue={setPaymentTerms} />
            </ContainerForInput>
          </ContentDropDownInputs>

          <Input
            label="Project Description"
            id="description"
            placeholder="e.g. Graphic Design Service"
            ref={forms.description.ref}
            {...forms.description}
          />

          <ItemListTitle>Item List</ItemListTitle>
          <ItemList itemsForm={itemsForm} setItemsForm={setItemsForm} />

          <FormErrors></FormErrors>
        </Content>

        <ButtonsContainer>
          <ButtonTheme type="button" custom={true} onClick={close}>
            Discard
          </ButtonTheme>
          <div>
            <ButtonDraft type="button" onClick={saveToDraft}>
              Save as Draft
            </ButtonDraft>
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
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgPrimary};
  width: clamp(650px, 50%, 800px);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 94px;
  height: 100vh;
  overflow-y: scroll;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 46px 46px 0px 46px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.title};
  margin-bottom: 12px;
`;

const BillTitle = styled.p`
  color: ${({ theme }) => theme.variantColors.primary.normal};
  font-weight: 700;
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

const FormErrors = styled.div``;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 46px;
  position: sticky;
  z-index: 4000;
  bottom: 0px;
  width: 100%;
  border-radius: 0px 20px 20px 0px;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgPrimary};
  box-shadow: 0px -10px 130px ${({ theme }) => theme.shadowColor};
  div button:first-child {
    margin-right: 8px;
  }
`;
