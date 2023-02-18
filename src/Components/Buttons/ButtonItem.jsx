import React from "react";
import styled from "styled-components";

const ButtonItem = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
};

export default ButtonItem;

const Button = styled.button`
  background: ${({ theme }) => theme.bgTertiary};
  color: ${({ theme }) => theme.textSecundary};
  padding: 16px 100px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.bgQuaternary};
  }
`;
