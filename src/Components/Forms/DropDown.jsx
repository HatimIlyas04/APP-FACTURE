import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimeDown } from "../../styles/animations";
import { ReactComponent as ArrowDown } from "../../assets/icon-arrow-down.svg";

const options = [
  {
    label: "Net 1 Day",
    value: "1",
  },
  {
    label: "Net 7 Days",
    value: "7",
  },
  {
    label: "Net 14 Days",
    value: "14",
  },
  {
    label: "Net 30 Days",
    value: "30",
  },
];

const DropDown = ({ setValue }) => {
  const [modal, setModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    value: options[options.length - 1].value,
    label: options[options.length - 1].label,
  });
  const dropDownRef = useRef(null);

  const handleClickOutside = ({ target }) => {
    if (modal) {
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        setModal(false);
      }
    }
  };

  const getLabelFromSelectedValue = (valueSelected) => {
    return options.find(({ value }) => +value === +valueSelected).label;
  };

  const getPaymentTerms = ({ target }) => {
    setModal(false);
    const { value } = target.dataset;
    const label = getLabelFromSelectedValue(value);
    setSelectedValue({ value, label });
    setValue({ value, label });
  };

  useEffect(() => {
    setValue({
      value: options[options.length - 1].value,
      label: options[options.length - 1].label,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Container ref={dropDownRef}>
      <Select onClick={() => setModal(!modal)} focus={modal}>
        <span>{selectedValue.label}</span>
        <ArrowDown />
      </Select>
      {modal && (
        <OptionsContainer>
          {options.map(({ label, value }) => {
            return (
              <Option key={value} data-value={value} onClick={getPaymentTerms}>
                {label}
              </Option>
            );
          })}
        </OptionsContainer>
      )}
    </Container>
  );
};

export default DropDown;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.title};
  position: relative;
  width: 100%;
`;

const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  width: 100%;
  cursor: pointer;
  max-height: 46px;
  border: 1px solid ${({ theme, focus }) => !focus ? theme.inputQuaternary : theme.variantColors.primary.normal};
  border-radius: 4px;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
`;

const OptionsContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 60px;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
  box-shadow: ${({ theme }) => theme.shadowPrimary};
  border-radius: 8px;
  animation: ${AnimeDown} 0.5s;
`;

const Option = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.name === "light" ? theme.bgQuaternary : theme.bgSecundary};
  cursor: pointer;
  transition: 0.3s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    color: ${({ theme }) => theme.variantColors.primary.normal};
  }
`;
