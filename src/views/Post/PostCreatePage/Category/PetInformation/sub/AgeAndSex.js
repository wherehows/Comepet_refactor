import React from 'react';
import LineBreakWrapper from '../../Common/LineBreakWrapper';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';

const AgeAndSex = () => {
  return (
    <LineBreakWrapper>
      <Input
        ariaLabel="age"
        name="age-input"
        width="10rem"
        placeholder="나이"
        type="number"
        margin="1.8rem 0 0 0"
      />
      <SelectionBox
        ariaLabel="sex"
        options={['수컷', '암컷']}
        defaultOption="성별"
        margin="0 0 0 1.6rem"
      />
    </LineBreakWrapper>
  );
};

AgeAndSex.propTypes = {};

export default AgeAndSex;
