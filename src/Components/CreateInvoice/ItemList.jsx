import React from "react";
import styled from "styled-components";
import ButtonItem from "../Buttons/ButtonItem";
import { ReactComponent as Delete } from "../../assets/icon-delete.svg";
import { formatCurrencyNotSymbol } from "../../Helper/format";
import { idGenerator } from "../../Helper/idGenerator";
import Input from "../Forms/Input";

const ItemList = ({ itemsForm, setItemsForm }) => {
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

  return (
    <>
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
