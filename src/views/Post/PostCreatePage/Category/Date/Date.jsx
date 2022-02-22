import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Date = ({ margin, onFillIn, onLeaveBlank }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleChange = (e) => {
    if (isYearSelection(e)) {
      if (isDefaultOptionSelected(e)) {
        setSelectedYear(null);
        setSelectedMonth(null);
        setSelectedDay(null);
      } else {
        setSelectedYear(Number(e.target.value));
      }
      return;
    }

    if (isMonthSelection(e)) {
      if (isDefaultOptionSelected(e)) {
        setSelectedMonth(null);
        setSelectedDay(null);
      } else {
        setSelectedMonth(Number(e.target.value));
      }
      return;
    }

    if (isDaySelection(e)) {
      isDefaultOptionSelected(e) ? setSelectedDay(null) : setSelectedDay(Number(e.target.value));
      return;
    }
  };

  useEffect(() => {
    if (areAllOptionsSelected(selectedYear, selectedMonth, selectedDay)) {
      onFillIn({
        date: `${selectedYear}-${makeYYYYMMDDForm(selectedMonth)}-${makeYYYYMMDDForm(selectedDay)}`
      });
    } else {
      onLeaveBlank('date');
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <Wrapper margin={margin} onChange={handleChange}>
      <Label bgColor="brand">날짜</Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox ariaLabel="year" defaultOption="년" required options={getRangeOfYear()} />
        <SelectionBox
          ariaLabel="month"
          defaultOption="월"
          margin="0 0 0 2rem"
          required
          options={getRangeOfMonth(selectedYear)}
        />
        <SelectionBox
          ariaLabel="day"
          defaultOption="일"
          margin="0 0 0 2rem"
          required
          options={getRangeOfDay(selectedMonth, selectedYear)}
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Date.propTypes = {
  onFillIn: PropTypes.func.isRequired,
  onLeaveBlank: PropTypes.func.isRequired,
  margin: PropTypes.string
};

export default memo(Date);

const getRangeOfYear = () => {
  const thisYear = new window.Date().getFullYear();
  const TenYearsAgo = thisYear - 10;
  const res = new Array(thisYear - TenYearsAgo + 1).fill(0).map((_, i) => i + TenYearsAgo);
  return res;
};

const getRangeOfMonth = (selectedYear) => {
  let res = [];
  const thisYear = new window.Date().getFullYear();

  if (!selectedYear) return res;

  if (selectedYear === thisYear) {
    const thisMonth = new window.Date().getMonth() + 1;
    res = new Array(thisMonth).fill(0).map((_, i) => i + 1);
  } else {
    res = new Array(12).fill(0).map((_, i) => i + 1);
  }

  return res;
};

const getRangeOfDay = (selectedMonth, selectedYear) => {
  const thisYear = new window.Date().getFullYear();
  const thisMonth = new window.Date().getMonth() + 1;
  let res = null;

  if (selectedYear === thisYear && selectedMonth === thisMonth) {
    const today = new window.Date().getDate();
    res = new Array(today).fill(0).map((_, i) => i + 1);
    return res;
  }

  if (selectedMonth === February) {
    if (isLeapYear(selectedYear)) {
      res = new Array(29).fill(0).map((_, i) => i + 1);
      return res;
    }

    if (!isLeapYear(selectedYear)) {
      res = new Array(28).fill(0).map((_, i) => i + 1);
      return res;
    }
  }

  if (selectedMonth !== February) {
    if (isMonthThatHas30Days(selectedMonth)) {
      res = new Array(30).fill(0).map((_, i) => i + 1);
      return res;
    }

    if (isMonthThatHas31Days(selectedMonth)) {
      res = new Array(31).fill(0).map((_, i) => i + 1);
      return res;
    }
  }

  return (res = []);
};

const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0)
  );
};
const isMonthThatHas31Days = (month) => [1, 3, 5, 7, 8, 10, 12].includes(month);
const isMonthThatHas30Days = (month) => [4, 6, 9, 11].includes(month);
const isYearSelection = (e) => e.target[0].textContent === '년';
const isMonthSelection = (e) => e.target[0].textContent === '월';
const isDaySelection = (e) => e.target[0].textContent === '일';
const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
const areAllOptionsSelected = (year, month, day) => year && month && day;
const makeYYYYMMDDForm = (number) => (number < 10 && `0${number}`) || number;
const February = 2;
