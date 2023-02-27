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
import {
  addNewInvoice,
  editInvoice,
  getEnvoiceById,
} from "../../store/invoice";
import { closeModal } from "../../store/modal";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import useMedia from "../../Hooks/useMedia";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";

const CreateInvoice = () => {
  const mobile = useMedia("(max-width: 700px)");
  const { id } = useParams();
  const invoice = useSelector(({ invoices }) => getEnvoiceById(invoices, id));
  const [itemsForm, setItemsForm] = useState([]);
  const [formsValue, setFormsValue] = useState({});
  const date = useRef(null);
  const [paymentTerms, setPaymentTerms] = useState(null);
  const [valid, setValid] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [savedChanges, setSavedChanges] = useState(false);
  const forms = {
    clientName: useForm(invoice ? invoice.clientName : ""),
    clientEmail: useForm(invoice ? invoice.clientEmail : ""),
    description: useForm(invoice ? invoice.description : ""),
    senderAddress: {
      city: useForm(invoice ? invoice.senderAddress.city : ""),
      street: useForm(invoice ? invoice.senderAddress.street : ""),
      postCode: useForm(invoice ? invoice.senderAddress.postCode : ""),
      country: useForm(invoice ? invoice.senderAddress.country : ""),
    },
    clientAddress: {
      street: useForm(invoice ? invoice.clientAddress.street : ""),
      city: useForm(invoice ? invoice.clientAddress.city : ""),
      postCode: useForm(invoice ? invoice.clientAddress.postCode : ""),
      country: useForm(invoice ? invoice.clientAddress.country : ""),
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
    if (id) {
      setSavedChanges((prev) => allValidate.every((valid) => valid));
    } else {
      verify && setValid((prev) => allValidate.every((valid) => valid));
    }
  };

  console.log(formsValue);

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

  useEffect(() => {
    if (valid) {
      dispatch(addNewInvoice(formsValue));
      dispatch(closeModal());
    }
  }, [formsValue]);

  const saveToDraft = () => {
    validateAllFormInputs(false);
    setFormsValue((values) => ({
      ...values,
      id: idGenerator(),
      status: "draft",
      ...getDates(),
    }));
    setIsDraft((state) => (state = true));
  };

  useEffect(() => {
    if (isDraft) {
      dispatch(addNewInvoice(formsValue));
      dispatch(closeModal());
    }
  }, [isDraft]);

  const close = () => {
    dispatch(closeModal());
  };

  const saveEdit = () => {
    validateAllFormInputs(true);
    setFormsValue((values) => ({
      ...values,
      id: id,
      status: "pending",
      ...getDates(),
    }));
  };

  useEffect(() => {
    if (savedChanges) {
      dispatch(editInvoice({ id: id, invoice: formsValue }));
      dispatch(closeModal());
    }
  }, [savedChanges]);

  return (
    <Container>
      <Form onSubmit={sendInvoice}>
        {mobile && (
          <Back onClick={close}>
            <ArrowLeft />
            Go Back
          </Back>
        )}
        <Title>
          {id ? (
            <>
              Edit <span>#</span>
              {id}
            </>
          ) : (
            "New Invoice"
          )}
        </Title>
        <Content>
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
          {!id && (
            <>
              {" "}
              <ButtonTheme type="button" custom={true} onClick={close}>
                Discard
              </ButtonTheme>
              <div>
                <ButtonDraft type="button" onClick={saveToDraft}>
                  Save as Draft
                </ButtonDraft>
                <ButtonDefault color="primary">Save & Send</ButtonDefault>
              </div>
            </>
          )}
          {id && (
            <ButtonsContainerEdit>
              <ButtonTheme type="button" onClick={close}>
                Cancel
              </ButtonTheme>
              <ButtonDefault type="button" color="primary" onClick={saveEdit}>
                Save Changes
              </ButtonDefault>
            </ButtonsContainerEdit>
          )}
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
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  @media (max-width: 800px) {
    padding-top: 90px;
  }
`;

const Form = styled.form`
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgPrimary};
  width: clamp(700px, 50%, 800px);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 32px 0px 0px 92px;
  height: 100%;
  @media (max-width: 800px) {
    padding-left: 0px;
  }
  @media (max-width: 700px) {
    width: 100%;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    //overflow-y: scroll;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100vh - 170px);
  padding: 16px 16px 16px 32px;
  margin-right: 24px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    //box-shadow: inset 0 0 5px grey;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.inputPrimary};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    //background: ${({ theme }) => theme.textPrimary};
  }
  @media (max-width: 800px) {
    height: calc(100vh - 262px);
  }
  @media (max-width: 700px) {
    height: calc(100vh - 300px);
    //overflow-y: hidden;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.title};
  margin-bottom: 12px;
  padding-left: 32px;
  span {
    color: ${({ theme }) => theme.textSecundary};
  }
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
  padding: 26px 36px 26px 46px;
  position: relative;
  z-index: 4000;
  bottom: 0px;
  left: -15px;
  width: calc(100% + 15px);
  border-radius: 0px 20px 20px 0px;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgPrimary};
  box-shadow: 0 -10px 130px -15px ${({ theme }) => theme.shadowColor};
  div button:first-child {
    margin-right: 8px;
  }
  @media (max-width: 800px) {
    //bottom: 90px;
  }
`;

const ButtonsContainerEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Back = styled.button`
  margin-bottom: 32px;
  display: flex;
  gap: 20px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  padding-left: 32px;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
`;
