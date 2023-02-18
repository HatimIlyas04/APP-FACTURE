import React from "react";
import styled from "styled-components";

const ButtonTheme = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
};

export default ButtonTheme;

const Button = styled.button`
  background: ${({ theme }) => theme.bgTertiary};
  color: ${({ theme }) => theme.textSecundary};
  padding: 16px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.bgQuaternary};
  }
`;
