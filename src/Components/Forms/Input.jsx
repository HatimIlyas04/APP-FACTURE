import React, { forwardRef } from "react";
import styled from "styled-components";
import useMedia from "../../Hooks/useMedia";

const Input = forwardRef(
  ({ label, type = "text", id, p = "16", error, ...props }, ref) => {
    const mobile = useMedia("(max-width: 450px)");

    return (
      <div>
        <Label htmlFor={id} error={error}>
          {label}
          {!mobile && <span> {error && error}</span>}
        </Label>
        <InputStyle
          type={type}
          id={id}
          p={p}
          ref={ref}
          error={error}
          {...props}
        />
      </div>
    );
  }
);

export default Input;

const InputStyle = styled.input`
  width: 100%;
  padding: ${({ p }) => `16px ${p}px`};
  border: 1px solid
    ${({ theme, error }) =>
      !error ? theme.inputPrimary : theme.variantColors.delete.normal};
  border-radius: 4px;
  outline: none;
  font-weight: 700;
  background: ${({ theme }) => theme.inputSecundary};
  &:focus {
    border-color: ${({ theme }) => theme.variantColors.primary.normal};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: ${({ theme, error }) =>
    !error ? theme.inputTertiary : theme.variantColors.delete.normal};
  span {
    font-size: 14px;
  }
`;
