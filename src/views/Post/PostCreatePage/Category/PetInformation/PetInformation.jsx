import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import AgeAndSex from './sub/AgeAndSex';
import Kind from './sub/Kind';

const PetInformation = ({ margin, animals, onFillIn, onLeaveBlank }) => {
  return (
    <Wrapper margin={margin}>
      <Label bgColor="brand">동물 정보</Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <Kind animals={animals} onFillIn={onFillIn} onLeaveBlank={onLeaveBlank} />
        <AgeAndSex onFillIn={onFillIn} onLeaveBlank={onLeaveBlank} />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

PetInformation.propTypes = {
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func,
  animals: PropTypes.array,
  margin: PropTypes.string
};

export default PetInformation;
