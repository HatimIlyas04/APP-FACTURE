import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/icon-arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icon-arrow-right.svg";
import { ReactComponent as Calendar } from "../../assets/icon-calendar.svg";
import { formatDate, getCurrentDate } from "../../Helper/format";
import { AnimeDown } from "../../styles/animations";

const allMonths = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const DatePicker = forwardRef(({}, ref) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const [currentMonth, setCurentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [lastDayOfMonth, setLastDayOfMonth] = useState(
    getDaysInMonth(currentYear, currentMonth)
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [modal, setModal] = useState(false);
  const dataPickerRef = useRef(null);
  const days = [];
  const [currentCalendar, setCurrentCalendar] = useState(() => {
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(i);
    }
    return days;
  });

  const nextMonth = () => {
    if (currentMonth < 12) {
      setCurentMonth((month) => month + 1);
    } else {
      setCurentMonth((month) => (month = 1));
      setCurrentYear((year) => year + 1);
    }
  };

  const previousMonth = () => {
    if (currentMonth !== 1) {
      setCurentMonth((month) => month - 1);
    } else {
      setCurentMonth((month) => (month = 12));
      setCurrentYear((year) => year - 1);
    }
  };

  useEffect(() => {
    setLastDayOfMonth(getDaysInMonth(currentYear, currentMonth));
    setCurrentCalendar((calendar) => {
      calendar = [];
      for (let i = 1; i <= lastDayOfMonth; i++) {
        calendar.push(i);
      }
      return calendar;
    });
  }, [currentYear, currentMonth, lastDayOfMonth]);

  const teste = ({ target }) => {
    setSelectedDate(target.value);
  };

  const getSelectedDay = ({ target }) => {
    const formattedDate = formatDate(target.dateTime);
    setSelectedDate(target.dateTime);
    ref.current.value = formattedDate;
  };

  const handleClickOutside = ({ target }) => {
    if (modal) {
      if (dataPickerRef.current && !dataPickerRef.current.contains(target)) {
        setModal(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Container ref={dataPickerRef}>
      <InputContainer onClick={() => setModal(!modal)}>
        <Input
          ref={ref}
          onChange={teste}
          placeholder={formatDate(getCurrentDate())}
        />
        <Calendar />
      </InputContainer>
      {modal && (
        <CalendarModal>
          <MonthAndYearContainer>
            <button type="button" onClick={previousMonth}>
              <ArrowLeft />
            </button>
            <MonthAndYear>
              {allMonths[currentMonth - 1]} {currentYear}
            </MonthAndYear>
            <button type="button" onClick={nextMonth}>
              <ArrowRight />
            </button>
          </MonthAndYearContainer>
          <DateGrid>
            {currentCalendar.map((day) => {
              return (
                <ButtonDay type="button" key={day}>
                  <Time
                    onClick={getSelectedDay}
                    dateTime={`${day}/${currentMonth}/${currentYear}`}
                  >
                    {day}
                  </Time>
                </ButtonDay>
              );
            })}
          </DateGrid>
        </CalendarModal>
      )}
    </Container>
  );
});

export default DatePicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 16px;
    bottom: 15px;
  }
  svg path {
    fill: ${({ theme }) => theme.variantColors.primary.normal};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 40px 16px 16px;
  border: 1px solid ${({ theme }) => theme.bgQuaternary};
  border-radius: 4px;
  font-family: "League Spartan", sans-serif;
  font-weight: 700;
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
  color: ${({ theme }) => theme.title};
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.variantColors.primary.normal};
  }
`;

const CalendarModal = styled.div`
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
  padding: 24px 18px;
  box-shadow: ${({ theme }) => theme.shadowPrimary};
  border-radius: 8px;
  animation: ${AnimeDown} 0.5s;
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 60px;
`;

const MonthAndYearContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.title};
  white-space: nowrap;
  button {
    padding: 5px 4px 0px 4px;
    background: transparent;
    cursor: pointer;
  }
`;

const MonthAndYear = styled.p``;
const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
`;

const ButtonDay = styled.button`
  background: ${({ theme }) =>
    theme.name === "light" ? theme.bgSecundary : theme.bgTertiary};
  cursor: pointer;
`;

const Time = styled.time`
  display: inline-block;
  color: ${({ theme }) => theme.title};
  padding: 2px;
  width: 100%;
`;
