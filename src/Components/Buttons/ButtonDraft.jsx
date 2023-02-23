import React from "react";
import styled from "styled-components";

const ButtonDraft = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default ButtonDraft;

const Button = styled.button`
  background: ${({ theme }) => theme.bgQuinary};
  color: ${({ theme }) => theme.textPrimary};
  padding: 16px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) =>
      theme.name === "light" ? theme.title : theme.bgSecundary};
  }
`;
