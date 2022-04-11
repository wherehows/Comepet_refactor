import React, { useState, useRef, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';

const Place = ({ margin, places, onFillIn, onLeaveBlank }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [towns, setTowns] = useState([]);
  const townRef = useRef(null);

  const cities = useMemo(() => {
    const res = places?.map(({ name }) => name);
    return res;
  }, [places]);

  const handleChange = (e) => {
    if (isDetailAddressEntered(e)) {
      isInputEmpty(e)
        ? onLeaveBlank({ detailAddress: null })
        : onFillIn({ detailAddress: e.target.value });
      return;
    }

    if (isCitySelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onLeaveBlank({ cityId: null });
        onLeaveBlank({ townId: null });
        setSelectedCity(null);
        setTowns([]);
      } else {
        townRef.current[0].selected = true;
        const targetCity = places.find(({ name }) => name === e.target.value);
        const targetCityId = targetCity?.id;
        setSelectedCity(targetCity.name);
        onFillIn({ cityId: targetCityId });
        onLeaveBlank({ townId: null });

        const targetTowns = places.find(({ name }) => name === e.target.value);
        const nextTowns = targetTowns.towns.map(({ name }) => name);
        setTowns(nextTowns);
      }
      return;
    }

    if (isTownSelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onLeaveBlank({ townId: null });
      } else {
        const targetCity = places.find(({ name }) => name === selectedCity);
        const towns = targetCity?.towns;
        const targetTown = towns?.find(({ name }) => name === e.target.value);
        const targetTownId = targetTown?.id;
        onFillIn({ townId: targetTownId });
      }
      return;
    }
  };

  return (
    <Wrapper margin={margin} onChange={handleChange}>
      <Label bgColor="brand">장소</Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox ariaLabel="city" options={cities} defaultOption="시/도" required />
        <SelectionBox
          ariaLabel="town"
          options={towns}
          defaultOption="시/군/구"
          margin="0 0 0 2rem"
          propRef={townRef}
          required
        />
        <Input
          ariaLabel="additional address information"
          placeholder="추가적인 정보를 적어주세요"
          margin="1.8rem 0 0 0"
          maxLength="255"
        />
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
