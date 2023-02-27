import React from "react";
import styled from "styled-components";
import { formatCurrency } from "../../Helper/format";


const ItemsInvoiceMobile = ({ data }) => {
  const { items, total } = data;

  return (
    <Container>
      <Content>
        {items.map(({ name, price, total, quantity }, index) => {
          return (
            <Item key={index}>
              <FirstColumn>
                <TextBold>{name}</TextBold>
                <p>{quantity} x R$ {price}</p>
              </FirstColumn>
              <TextBold>R$ {total}</TextBold>
            </Item>
          );
        })}
      </Content>
      <AmountDue>
        <p>Grand Total</p>
        <Total>{formatCurrency(total)}</Total>
      </AmountDue>
    </Container>
  );
};

export default ItemsInvoiceMobile;

const Container = styled.div`
  border-radius: 8px;
  padding: 24px;
`;

const Content = styled.div`
  padding: 32px;
  background: ${({ theme }) => theme.bgTertiary};
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

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
  padding: 24px;
  border-radius: 0px 0px 8px 8px;
`;

const Total = styled.span`
  font-size: 20px;
  font-weight: 700;
`;
