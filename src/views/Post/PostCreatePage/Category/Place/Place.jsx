import React, { useState, useRef, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';

const Place = ({ margin, places, onFillIn, onLeaveBlank }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const townRef = useRef(null);

  const cities = useMemo(() => {
    const res = places?.map(({ name }) => name);
    return res;
  }, [places]);

  const towns = useMemo(() => {
    const res = places?.find(({ name }) => name === selectedCity);
    return res?.towns.map(({ name }) => name);
  }, [selectedCity, places]);

  const handleChange = (e) => {
    if (isDetailAddressEntered(e)) {
      isInputEmpty(e) ? onLeaveBlank('detailAddress') : onFillIn({ detailAddress: e.target.value });
      return;
    }

    if (isCitySelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onLeaveBlank('cityId');
        onLeaveBlank('townId');
        setSelectedCity(null);
      } else {
        townRef.current[0].selected = true;
        const selectedCity = places.find(({ name }) => name === e.target.value);
        const selectedId = selectedCity?.id;
        setSelectedCity(selectedCity.name);
        onFillIn({ cityId: selectedId });
        onLeaveBlank('townId');
      }
      return;
    }

    if (isTownSelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onLeaveBlank('townId');
      } else {
        const selectedCity = places.find(({ name }) => name === selectedCity);
        const towns = selectedCity?.towns;
        const selectedTown = towns?.find(({ name }) => name === e.target.value);
        const selectedId = selectedTown?.id;
        onFillIn({ townId: selectedId });
      }
      return;
    }
  };

  return (
    <Wrapper margin={margin} onChange={handleChange}>
      <Label htmlFor="post-create-city" bgColor="brand">
        장소
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox id="post-create-city" options={cities || []} defaultOption="시/도" required />
        <SelectionBox
          id="post-create-town"
          options={towns || []}
          defaultOption="시/군/구"
          margin="0 0 0 2rem"
          propRef={townRef}
          required
        />
        <Input placeholder="추가적인 정보를 적어주세요" margin="1.8rem 0 0 0" maxLength="255" />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Place.propTypes = {
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func,
  places: PropTypes.array,
  margin: PropTypes.string
};

export default memo(Place);

const isDetailAddressEntered = (e) => e.target.tagName === 'INPUT';
const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
const isCitySelection = (e) => e.target[0].textContent === '시/도';
const isTownSelection = (e) => e.target[0].textContent === '시/군/구';
const isInputEmpty = (e) => e.target.value.length === 0;
