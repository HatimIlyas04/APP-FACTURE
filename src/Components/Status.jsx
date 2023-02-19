import React from "react";
import styled from "styled-components";

const Status = ({status}) => {
  return (
    <Container status={status}>
      <span>{status}</span>
    </Container>
  );
};

export default Status;


const Container = styled.div`
  color: ${({ theme, status }) => theme.variantColors[status].normal};
  background: ${({ theme, status }) => theme.variantColors[status].hover};
  padding: 12px;
  width: 104px;
  border-radius: 6px;
  span {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    &::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${({ theme, status }) => theme.variantColors[status].normal};
      position: relative;
    }
  }
`;