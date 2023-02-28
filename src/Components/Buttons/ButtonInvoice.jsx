import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../assets/icon-plus.svg";

const ButtonInvoice = ({ children, ...props }) => {
  return (
    <Button {...props}>
      <IconBg>
        <AddIcon />
      </IconBg>
      {children}
    </Button>
  );
};

export default ButtonInvoice;

const Button = styled.button`
  background: ${({ theme }) => theme.variantColors.primary.normal};
  color: ${({ theme }) => theme.buttonText};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px 8px 8px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  white-space: nowrap;
  &:hover {
    background: ${({ theme }) => theme.variantColors.primary.hover};
  }
  svg path {
    fill: ${({ theme }) => theme.variantColors.primary.normal};
  }
  @media (max-width: 700px) {
    padding: 6px 12px 6px 6px;
    gap: 8px;
  }
`;

const IconBg = styled.div`
  background: ${({ theme }) => theme.buttonText};
  border-radius: 50%;
  padding: 10px;
  display: flex;
`;
