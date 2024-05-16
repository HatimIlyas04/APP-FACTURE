import React from "react";
import styled from "styled-components";
import ButtonItem from "../Buttons/ButtonItem";
import { ReactComponent as Delete } from "../../assets/icon-delete.svg";
import { formatCurrencyNotSymbol } from "../../Helper/format";
import { idGenerator } from "../../Helper/idGenerator";
import Input from "../Forms/Input";
import { AnimeScale } from "../../styles/animations";
import useMedia from "../../Hooks/useMedia";

const ItemList = ({ itemsForm, setItemsForm }) => {
  const mobile = useMedia("(max-width: 700px)");
  
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
      items.map((item) => {
        if (targetId.includes(item.id)) {
          item[type] = target.value;
          if (type === "quantity" || type === "price") {
            const parsedQuantity = parseFloat(item.quantity);
            const parsedPrice = parseFloat(item.price);
            const empty = !isNaN(parsedQuantity) && !isNaN(parsedPrice);
            item.total = empty ? formatCurrencyNotSymbol(parsedQuantity * parsedPrice) : "0,00";
          }
        }
        return item;
      })
    );
  };
  

  return (
    <>
      <ItemGridLabel>
        <p>Nom de l'article</p>
        <p>Qté.</p>
        <p>Prix</p>
        <p>Total</p>
      </ItemGridLabel>
      {itemsForm.map(({ id, name, quantity, price, total, disabled }) => {
        return (
          <ItemSolo key={id}>
            <FirstColumn>
              {mobile && <Label>Nom de l'article</Label>}
              <Input
            id={`${id}-1`}
            data-type={"name"}
            onChange={handleChangeItems}
            value={name}
            disabled={disabled ? true : false}
          />
            </FirstColumn>
            <InputCont>
              {mobile && <Label>Qté.</Label>}
              <Input
                id={`${id}-2`}
                data-type={"quantity"}
                onChange={handleChangeItems}
                type="number"
                p="8"
                value={quantity}
                disabled={disabled ? true : false}
              />
            </InputCont>
            <InputCont>
              {mobile && <Label>Prix</Label>}
              <Input
                id={`${id}-3`}
                data-type={"price"}
                onChange={handleChangeItems}
                type="number"
                value={price}
                disabled={disabled ? true : false}
              />
            </InputCont>
            <span>
              <InputCont>
                {mobile && <Label>Total</Label>}
                <Total>{total}</Total>
              </InputCont>
              <DeleteContainer data-id={id} onClick={removeItem}>
                <Delete />
              </DeleteContainer>
            </span>
          </ItemSolo>
        );
      })}
      <ButtonItem type="button" onClick={AddNewItem}>
        + Ajouter un nouvel article
      </ButtonItem>
    </>
  );
};

export default ItemList;

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
  animation: ${AnimeScale} 0.5s forwards;
  @media (max-width: 700px) {
    grid-template-columns: 3fr 5fr 5fr;
    span {
      justify-content: space-between;
      height: 100%;
    }
  }
`;

const DeleteContainer = styled.div`
  cursor: pointer;
  margin-top: 14px;
  @media (max-width: 700px) {
    margin-top: 40px;
  }
  svg path:hover {
    fill: ${({theme}) => theme.variantColors.delete.normal};
    transition: 0.2s ease-in-out;
  }
`;

const ItemGridLabel = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 2fr 2fr;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) =>
    theme.name === "light" ? theme.textSecundary : theme.textPrimary};
  @media (max-width: 700px) {
    display: none;
  }
`;

const Label = styled.p`
  color: ${({ theme }) =>
    theme.name === "light" ? theme.textSecundary : theme.textPrimary};
`;

const FirstColumn = styled.div`
  @media (max-width: 700px) {
    grid-column: 1 / -1;
  }
`;

const InputCont = styled.div``;

const Total = styled.div`
  margin-top: 16px;
  @media (max-width: 700px) {
    margin-top: 28px;
  }
`;
