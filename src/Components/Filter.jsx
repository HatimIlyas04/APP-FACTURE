import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowDown } from "../assets/icon-arrow-down.svg";
import { ReactComponent as CheckIcon } from "../assets/icon-check.svg";
import { AnimeDown } from "../styles/animations";

const data = {
  type: "status",
  options: ["draft", "pending", "paid"],
};

const Filter = ({ value, setValue }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropDownRef = useRef(null);
  const handleChange = ({ target }) => {
    if (target.checked) {
      setValue([...value, target.value]);
    } else {
      setValue(value.filter((cor) => cor !== target.value));
    }
  };

  const handleClickOutside = ({ target }) => {
    if (dropdown) {
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        console.log("ue");
        setDropdown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Container ref={dropDownRef}>
      <LabelType onClick={() => setDropdown(!dropdown)} active={dropdown}>
        Filter by {data.type} <ArrowDown />
      </LabelType>
      {dropdown && (
        <Dropdown>
          {data.options.map((option) => {
            return (
              <LabelOption key={option}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={option}
                  onChange={handleChange}
                  checked={value.includes(option)}
                />
                <PseudoCheck>
                  <CheckIcon />
                </PseudoCheck>
                {option}
              </LabelOption>
            );
          })}
        </Dropdown>
      )}
    </Container>
  );
};

export default Filter;

const Container = styled.div`
  width: 190px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const LabelType = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  cursor: pointer;
  svg  {
    transition: 0.4s ease-in-out;
    transform: ${({active}) => active ? 'rotate(180deg)' : 'rotate(0deg)'};
    fill: ${({active}) => active ? 'red' : 'green'};
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  position: absolute;
  top: 30px;
  width: 100%;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
  box-shadow: ${({ theme }) => theme.shadowPrimary};
  border-radius: 8px;
  animation: ${AnimeDown} 0.5s;
`;

const PseudoCheck = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgQuaternary : theme.bgSecundary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelOption = styled.label`
  display: flex;
  gap: 13px;
  svg {
    display: none;
  }

  &:hover ${PseudoCheck} {
    border: 1px solid ${({ theme }) => theme.variantColors.primary.normal};
  }

  input {
    display: none;
    &:checked + ${PseudoCheck} {
      background: ${({ theme }) => theme.variantColors.primary.normal};
      svg {
        display: initial;
      }
    }
  }
`;
