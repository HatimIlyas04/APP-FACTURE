import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../../Helper/format";
import { getEnvoiceById } from "../../store/invoice";
import ItemsInvoice from "./ItemsInvoice";

const UniqueInvoiceData = () => {
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id))
  const senderAddress = data?.senderAddress;
  const clientAddress = data?.clientAddress;
  

  useEffect(() => {
    
  }, [])

  const format = (date) => date.split("-").reverse().join("-");

  if(!data) return null
  return (
    <Container>
      <SendContent>
        <div>
          <Id>
            <span>#</span>
            {data.id}
          </Id>
          <p>{data.description}</p>
        </div>
        <SenderAddress>
          <p>{senderAddress.street}</p>
          <p>{senderAddress.city}</p>
          <p>{senderAddress.postCode}</p>
          <p>{senderAddress.country}</p>
        </SenderAddress>
      </SendContent>
      <ClientContent>
        <Dates>
          <div>
            <p>Invoice Date</p>
            <TextBold>{formatDate(data.createdAt)}</TextBold>
          </div>
          <div>
            <p>Payment Due</p>
            <TextBold>{formatDate(format(data.paymentDue))}</TextBold>
          </div>
        </Dates>
        <ClientAddress>
          <p>Bill To</p>
          <TextBold>{data.clientName}</TextBold>
          <div>
            <p>{clientAddress.street}</p>
            <p>{clientAddress.city}</p>
            <p>{clientAddress.postCode}</p>
            <p>{clientAddress.country}</p>
          </div>
        </ClientAddress>
        <Email>
          <p>Send To</p>
          <TextBold>{data.clientEmail}</TextBold>
        </Email>
      </ClientContent>
      <ItemsInvoice data={data} />
    </Container>
  );
};

export default UniqueInvoiceData;

const Container = styled.div`
  color: ${({ theme }) =>
    theme.name === "light" ? theme.textSecundary : theme.textPrimary};
    margin-bottom: 48px;
`;

const SendContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 48px 48px 0px 48px;
`;

const Id = styled.h2`
  font-weight: 22px;
  color: ${({ theme }) => theme.title};
  margin-bottom: 8px;
  span {
    color: ${({ theme }) => theme.textSecundary};
  }
`;

const SenderAddress = styled.div`
  text-align: end;
  line-height: 22px;
`;

const ClientContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0px 48px;
`;

const TextBold = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.title};
  margin-top: 12px;
`;

const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ClientAddress = styled.div`
  div {
    margin-top: 8px;
    line-height: 22px;
  }
`;

const Email = styled.div``;
