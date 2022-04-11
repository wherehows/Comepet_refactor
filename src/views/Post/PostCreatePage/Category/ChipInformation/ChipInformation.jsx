import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const ChipInformation = ({ margin, onFillIn, onLeaveBlank }) => {
  const handleInputChipNumber = (e) => {
    isInputEmpty(e) ? onLeaveBlank({ chipNumber: null }) : onFillIn({ chipNumber: e.target.value });
  };

  return (
    <Wrapper margin={margin}>
      <Label htmlFor="chip-number" bgColor="brand">
        칩번호
      </Label>
      <Input
        id="chip-number"
        placeholder="칩번호를 입력해 주세요"
        type="number"
        margin="1.8rem 0 0 0"
        onChange={handleInputChipNumber}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

ChipInformation.propTypes = {
  margin: PropTypes.string,
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func
};

export default memo(ChipInformation);

const isInputEmpty = (e) => e.target.value.length === 0;
