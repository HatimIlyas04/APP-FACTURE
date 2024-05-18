import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { formatDate } from '../../Helper/format';
import useMedia from '../../Hooks/useMedia';
import { getEnvoiceById } from '../../store/invoice';
import ItemsInvoice from './ItemsInvoice';
import ItemsInvoiceMobile from './ItemsInvoiceMobile';
import InvoicePDF from './InviocePDF';
import ButtonDefault from '../Buttons/ButtonDefault'; // Import ButtonDefault

const UniqueInvoiceData = () => {
  const mobile = useMedia('(max-width: 700px)');
  const { id } = useParams();
  const data = useSelector(({ invoices }) => getEnvoiceById(invoices, id));
  const senderAddress = data?.senderAddress;
  const clientAddress = data?.clientAddress;

  useEffect(() => {}, []);

  const format = (date) => date.split('-').reverse().join('-');
  if (!data) return null;
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
            <p>Date de facturation</p>
            <TextBold>{formatDate(format(data.createdAt))}</TextBold>
          </div>
          <div>
            <p>Date d'échéance</p>
            <TextBold>{formatDate(format(data.paymentDue))}</TextBold>
          </div>
        </Dates>
        <ClientAddress>
          <p>Facturé à</p>
          <TextBold>{data.clientName}</TextBold>
          <div>
            <p>{clientAddress.street}</p>
            <p>{clientAddress.city}</p>
            <p>{clientAddress.postCode}</p>
            <p>{clientAddress.country}</p>
          </div>
        </ClientAddress>
        <Email>
          <p>Envoyer à</p>
          <TextBold>{data.clientEmail}</TextBold>
        </Email>
      </ClientContent>
      {!mobile ? <ItemsInvoice data={data} /> : <ItemsInvoiceMobile data={data} />}
      <PDFButtonContainer>
        <PDFDownloadLink document={<InvoicePDF data={data} />} fileName={`invoice_${data.id}.pdf`}>
          {({ blob, url, loading, error }) =>
            loading ? (
              <ButtonDefault color="primary">Loading document...</ButtonDefault>
            ) : (
              <ButtonDefault color="primary" as="a" href={url} download>
                Download PDF
              </ButtonDefault>
            )
          }
        </PDFDownloadLink>
      </PDFButtonContainer>
    </Container>
  );
};

export default UniqueInvoiceData;

const Container = styled.div`
  color: ${({ theme }) =>
    theme.name === 'light' ? theme.textSecondary : theme.textPrimary};
  margin-bottom: 48px;
  width: 100%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Id = styled.h2`
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.title};
  margin-bottom: 8px;
  span {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const SendContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 48px 48px 0 48px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: start;
    gap: 30px;
    margin-bottom: 30px;
    padding: 16px 16px 0 16px;
  }
`;

const SenderAddress = styled.div`
  text-align: end;
  line-height: 22px;
  @media (max-width: 600px) {
    text-align: start;
  }
`;

const ClientContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 48px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    padding: 0 16px;
  }
`;

const ClientAddress = styled.div`
  div {
    margin-top: 8px;
    line-height: 22px;
  }
  @media (max-width: 700px) {
    margin-bottom: 30px;
  }
`;

const TextBold = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.title};
  margin-top: 12px;
  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Email = styled.div`
  @media (max-width: 700px) {
    grid-column: 1 / -1;
  }
`;

const PDFButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
