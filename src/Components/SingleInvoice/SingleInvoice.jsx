import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import HeaderSingleInvoice from "./HeaderSingleInvoice";
import UniqueInvoiceData from "./UniqueInvoiceData";

const SingleInvoice = () => {
  const [data, setData] = useState(null);
  const idInvoice = "AA1449";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../data.json");
      const json = await response.json();
      const data = json.filter(({ id }) => id === idInvoice);
      setData(...data);
    };
    fetchData();
  }, []);

  //console.log(data)
  if (data === null) return null;
  return (
    <MainBg>
      <Container>
        <Back>
          <ArrowLeft />
          Go Back
        </Back>
        <HeaderSingleInvoice />
        <Content>
          <UniqueInvoiceData data={data} />
        </Content>
      </Container>
    </MainBg>
  );
};

export default SingleInvoice;

const MainBg = styled.main`
  width: 100%;
`;

const Container = styled.main`
  max-width: 730px;
  margin: 0 auto;
  margin-top: 30px;
`;

const Back = styled.button`
  margin-bottom: 32px;
  display: flex;
  gap: 20px;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.title};
  &:hover {
    color: ${({ theme }) => theme.textQuaternary};
  }
`;

const Content = styled.div`
  background: ${({ theme }) => theme.bgSecundary};
  box-shadow: ${({ theme }) => theme.shadowSecundary};
  border-radius: 8px;
  margin-top: 30px;
`;
