import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { formatCurrency } from "../../Helper/format";

// Define image URL
const logo = 'https://example.com/logo.png';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  container: {
    borderRadius: 8,
    padding: 24,
  },
  content: {
    padding: 32,
    background: '#f0f0f0',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  textBold: {
    fontWeight: 'bold',
    color: '#333',
  },
  amountDue: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333',
    background: '#e0e0e0',
    padding: '24px',
    borderRadius: '0 0 8px 8px',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const InvoicePDF = ({ data }) => {
  const { id, description, senderAddress, clientAddress, createdAt, paymentDue, clientName, clientEmail, items, total } = data;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.container}>
          <Image src={logo} style={{ marginBottom: 20 }} />
          <View style={styles.content}>
            <Text style={styles.textBold}>Invoice #{id}</Text>
            <Text>{description}</Text>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.textBold}>Sender Address</Text>
                <Text>{senderAddress.street}</Text>
                <Text>{senderAddress.city}</Text>
                <Text>{senderAddress.postCode}</Text>
                <Text>{senderAddress.country}</Text>
              </View>
              <View>
                <Text style={styles.textBold}>Client Address</Text>
                <Text>{clientAddress.street}</Text>
                <Text>{clientAddress.city}</Text>
                <Text>{clientAddress.postCode}</Text>
                <Text>{clientAddress.country}</Text>
              </View>
            </View>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.textBold}>Date de facturation</Text>
                <Text>{createdAt}</Text>
              </View>
              <View>
                <Text style={styles.textBold}>Date d'échéance</Text>
                <Text>{paymentDue}</Text>
              </View>
            </View>
            <Text style={styles.textBold}>Facturé à</Text>
            <Text>{clientName}</Text>
            <Text style={styles.textBold}>Envoyer à</Text>
            <Text>{clientEmail}</Text>
            <Text style={styles.textBold}>Articles</Text>
            <View>
              <Text style={styles.textBold}>Nom de l'article</Text>
              <Text style={styles.textBold}>Qté.</Text>
              <Text style={styles.textBold}>Prix</Text>
              <Text style={styles.textBold}>Total</Text>
              {items.map(({ name, price, total, quantity }, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text>{name}</Text>
                  <Text>{quantity}</Text>
                  <Text>{formatCurrency(price)}</Text>
                  <Text>{formatCurrency(total)}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.amountDue}>
            <Text>Grand Total</Text>
            <Text style={styles.total}>{formatCurrency(total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
