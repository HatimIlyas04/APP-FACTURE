import React from "react";
import styled from "styled-components";
import { formatCurrency } from "../../Helper/format";

const ItemsInvoice = ({ data }) => {
  const { items, total } = data;


  return (
<Container>
  <Content>
    <FirstColumn>Nom de l'article</FirstColumn>
    <p>Qté.</p>
    <p>Prix</p>
    <p>Total</p>
    {items.map(({ name, price, total, quantity }, index) => {
      return (
        <React.Fragment key={index}>
          <FirstColumn>
            <TextBold>{name}</TextBold>
          </FirstColumn>
          <p>{quantity}</p>
          <p>{formatCurrency(price)}</p>
          <TextBold>{formatCurrency(total)}</TextBold>
        </React.Fragment>
      );
    })}
  </Content>
  <AmountDue>
    <p>Montant</p>
    <Total>{formatCurrency(total)}</Total>
  </AmountDue>
</Container>
  );
};

export default ItemsInvoice;

const Container = styled.div`
  border-radius: 8px;
  padding: 48px;
`;

const Content = styled.div`
  padding: 32px;
  display: grid;
  grid-template-columns: 6fr repeat(3, 5fr);
  justify-items: flex-end;
  gap: 32px 10px;
  background: ${({ theme }) => theme.bgTertiary};
  border-radius: 8px 8px 0px 0px;
`;

const FirstColumn = styled.div`
  justify-self: start;
`;

const TextBold = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.title};
`;

const AmountDue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgQuinary : theme.bgSenary};
  padding: 24px 32px;
  border-radius: 0px 0px 8px 8px;
`;

const Total = styled.span`
  font-size: 26px;
`;
