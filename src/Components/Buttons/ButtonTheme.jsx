import React from "react";
import styled from "styled-components";

const ButtonTheme = ({ children, custom, ...props }) => {
  return (
    <Button {...props} custom={custom ? true : false}>
      {children}
    </Button>
  );
};

export default ButtonTheme;

const Button = styled.button`
  background: ${({ theme, custom }) =>
    custom && theme.name === "dark" ? theme.bgQuaternary : theme.bgTertiary};
  color: ${({ theme }) => theme.textSecundary};
  padding: 16px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme, custom }) =>
    custom && theme.name === "dark" ? theme.constSecundary  : theme.bgQuaternary};;
  }
`;
