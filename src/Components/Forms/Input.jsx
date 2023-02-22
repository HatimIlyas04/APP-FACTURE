import React from 'react'
import styled from 'styled-components'

const Input = ({label, type = 'text', id, placeholder}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <InputStyle type={type} id={id} name={id}  placeholder={placeholder}/>
    </div>
  )
}

export default Input

const InputStyle = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.name === 'light' ? theme.bgQuaternary : theme.bgTertiary};
  border-radius: 4px;
  outline: none;
  font-weight: 700;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
  &:focus {
    border-color: ${({ theme }) => theme.variantColors.primary.normal};
  }
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 10px;
  color: ${({theme}) => theme.name === 'light' ? theme.textSecundary : theme.textPrimary}
`