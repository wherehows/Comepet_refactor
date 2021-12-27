import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const ChipInformation = ({ margin, onFillIn }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      onFillIn({ target: { name: 'chipNumber', value: e.target.value } });
    } else if (e.target.value.length === 0) {
      onFillIn({ target: { name: 'chipNumber', value: null } });
    }
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        칩번호
      </Label>
      <Input
        placeholder="칩번호를 입력해 주세요"
        type="number"
        onChange={handleChange}
        margin="1.8rem 0 0 0"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

ChipInformation.propTypes = {
  margin: PropTypes.string,
  onFillIn: PropTypes.func
};

export default ChipInformation;
