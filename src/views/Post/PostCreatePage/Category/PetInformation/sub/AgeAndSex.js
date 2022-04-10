import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';

const AgeAndSex = ({ onFillIn, onLeaveBlank }) => {
  const handleFillInAge = (e) => {
    isInputEmpty(e) ? onLeaveBlank('age', -1) : onFillIn({ age: e.target.value });
  };

  const handleSelectSex = (e) => {
    if (isDefaultOptionSelected(e)) {
      onLeaveBlank('sex');
      return;
    }

    onFillIn({
      sex: (e.target.value === '수컷' && 'MALE') || (e.target.value === '암컷' && 'FEMALE')
    });
  };

  return (
    <Wrapper>
      <Input
        id="age-input"
        ariaLabel="age"
        width="10rem"
        placeholder="나이"
        type="number"
        margin="1.8rem 0 0 0"
        onChange={handleFillInAge}
      />
      <SelectionBox
        ariaLabel="sex"
        options={['수컷', '암컷']}
        defaultOption="성별"
        margin="0 0 0 1.6rem"
        onChange={handleSelectSex}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

AgeAndSex.propTypes = {
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func,
  margin: PropTypes.string
};

export default AgeAndSex;

const isInputEmpty = (e) => e.target.value.length === 0;
const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
