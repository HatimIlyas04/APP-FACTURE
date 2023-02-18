import React from "react";
import styled from "styled-components";

const ButtonDefault = ({ children, color, ...props }) => {
  return (
    <Button {...props} color={color}>
      {children}
    </Button>
  );
};

export default ButtonDefault;

const Button = styled.button`
  background: ${({ theme, color }) => theme.variantColors[color].normal};
  color: ${({ theme }) => theme.buttonText};
  padding: 16px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme, color }) => theme.variantColors[color].hover};
  }
`;
