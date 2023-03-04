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
import { AnimeDownBig, AnimeLeft } from "../../styles/animations";

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
  const [formErrors, setFormErros] = useState([]);
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

  useEffect(() => {
    if (id) {
      const itemsInvoice = invoice.items.map((item) => ({
        ...item,
        disabled: true,
      }));
      setItemsForm((items) => [...itemsInvoice]);
    }
  }, []);

  const store = useSelector((store) => store);
  const dispatch = useDispatch();

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
    validErrors(allValidate);
    if (id) {
      setSavedChanges((prev) => allValidate.every((valid) => valid));
    } else {
      verify && setValid((prev) => allValidate.every((valid) => valid));
    }
  };

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

  const setErrors = (test, errorText) => {
    if (test) {
      setFormErros((errors) => {
        if (!formErrors.includes(errorText)) {
          return [...errors, errorText];
        } else return errors;
      });
    } else {
      setFormErros((errors) => {
        const index = errors.indexOf(errorText);
        const newErrors = errors.filter((error, i) => index !== i);
        return newErrors;
      });
    }
  };

  const validErrors = (allValidate) => {
    const errorItem = "An item must be added";
    const inputsError = "All fields must be added";
    const validValue = allValidate.every((valid) => valid);
    setErrors(itemsForm.length === 0, errorItem);
    setErrors(!validValue, inputsError);
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
    if (valid && !formErrors.length) {
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
    if (savedChanges && !formErrors.length) {
      dispatch(editInvoice({ id: id, invoice: formsValue }));
      dispatch(closeModal());
    }
  });

  return (
    <Container>
      <Form onSubmit={sendInvoice}>
        <Content>
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
            <Country>
              <Input
                label="Country"
                id="sendCountry"
                ref={forms.senderAddress.country.ref}
                {...forms.senderAddress.country}
              />
            </Country>
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
            <Country>
              <Input
                label="Country"
                id="clientCountry"
                ref={forms.clientAddress.country.ref}
                {...forms.clientAddress.country}
              />
            </Country>
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

          <FormErrors>
            {formErrors.map((error) => (
              <Error key={error}>- {error}</Error>
            ))}
          </FormErrors>
        </Content>
        <ButtonsContainer>
          {!id && (
            <ButtonsContainerCreate>
              <ButtonTheme type="button" custom={true} onClick={close}>
                Discard
              </ButtonTheme>
              <div>
                <ButtonDraft type="button" onClick={saveToDraft}>
                  Save as Draft
                </ButtonDraft>
                <ButtonDefault color="primary">Save & Send</ButtonDefault>
              </div>
            </ButtonsContainerCreate>
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
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  @media (max-width: 700px) {
    height: 100%;
  }
`;

const Form = styled.form`
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgPrimary};
  width: clamp(700px, 50%, 800px);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 0px 0px 92px;
  height: 100%;
  position: relative;
  animation: ${AnimeLeft} 0.5s forwards;
  @media (max-width: 800px) {
    padding-left: 0px;
  }
  @media (max-width: 700px) {
    width: 100%;
    height: initial;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    animation: ${AnimeDownBig} 0.5s forwards;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100% - 102px);
  padding: 16px 16px 16px 32px;
  margin-right: 24px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
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
    padding-bottom: 90px;
  }
  @media (max-width: 700px) {
    margin-right: 8px;
    padding: 16px 8px 16px 18px;
    overflow-y: hidden;
    height: 100%;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.title};
  margin-bottom: 12px;
  span {
    color: ${({ theme }) => theme.textSecundary};
  }
`;

const BillTitle = styled.p`
  color: ${({ theme }) => theme.variantColors.primary.normal};
  font-weight: 700;
`;

const AddressFlex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContentDropDownInputs = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ContainerForInput = styled.div`
  width: 100%;
`;

const Country = styled.div`
  grid-column: 1 / -1;
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
  @media (max-width: 700px) {
    margin-top: 32px;
  }
`;

const ButtonsContainer = styled.div`
  padding: 26px 36px 26px 140px;
  position: absolute;
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
    padding: 24px;
    bottom: 90px;
  }
  @media (max-width: 700px) {
    border-radius: 0px;
    left: 0px;
    width: 100%;
    position: static;
    box-shadow: none;
  }
  @media (max-width: 410px) {
    padding: 32px 24px;
  }
`;

const ButtonsContainerEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ButtonsContainerCreate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 430px) {
    button {
      font-size: 12px;
      padding: 10px 18px;
    }
  }
  @media (max-width: 375px) {
    button {
      font-size: 10px;
      padding: 8px 14px;
    }
  }
`;

const Back = styled.button`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-right: auto;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
  svg {
    margin-right: 20px;
  }
`;

const FormErrors = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const Error = styled.li`
  color: ${({ theme }) => theme.variantColors.delete.normal};
`;
