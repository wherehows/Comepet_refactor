import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const STATUS = Object.freeze({
  실종: 'MISSING',
  목격: 'DETECTION',
  보호: 'PROTECTION',
  완료: 'COMPLETION'
});

const Status = ({ onFillIn, onLeaveBlank }) => {
  const handleSelectStatus = (e) => {
    isDefalutOptionSelected(e)
      ? onLeaveBlank('status')
      : onFillIn({ status: STATUS[e.target.value] });
  };

  return (
    <Wrapper>
      <Label htmlFor="status" bgColor="brand">
        상태 정보
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          onChange={handleSelectStatus}
          options={['실종', '목격', '보호', '완료']}
          defaultOption="상태 옵션"
          required
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

Status.propTypes = {
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func
};

export default memo(Status);
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
