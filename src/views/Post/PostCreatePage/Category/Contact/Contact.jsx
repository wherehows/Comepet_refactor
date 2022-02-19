import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';

const Contact = ({ margin, onFillIn, onLeaveBlank }) => {
  const handleInput = (e) => {
    isInputEmpty(e) ? onLeaveBlank('telNumber') : onFillIn({ telNumber: e.target.value });
  };

  return (
    <Wrapper margin={margin}>
      <Label htmlFor="post-create-tel-number" bgColor="brand">
        연락처
      </Label>
      <Input
        id="post-create-tel-number"
        placeholder="연락처 정보를 적어주세요"
        maxLength="15"
        margin="1.8rem 0 0 0"
        required
        onChange={handleInput}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Contact.propTypes = {
  margin: PropTypes.string,
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func
};

export default Contact;

const isInputEmpty = (e) => e.target.value.length === 0;
