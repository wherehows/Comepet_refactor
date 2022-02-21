import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';
import { CheckBox } from '@/components/CheckBox';

const PetInformation = ({ margin, animals, onFillIn, onLeaveBlank }) => {
  const [animal, setAnimal] = useState('동물');
  const [animalKindName, setAnimalKindName] = useState(null);
  const [isAnimalUnknown, setIsAnimalUnknown] = useState(false);
  const kindsSelectionBoxRef = useRef(null);
  const kindsCheckBoxRef = useRef(null);

  const animalList = useMemo(() => {
    const selectedAnimal = animals.find(({ name }) => name === animal);
    const selectedKinds = selectedAnimal?.kinds;
    const res = selectedKinds?.map(({ name }) => name);
    return res;
  }, [animal, animals]);

  useEffect(() => {
    if (!isAnimalSelected(animal)) {
      onLeaveBlank('animalId');
    } else {
      const selectedAniaml = animals?.find(({ name }) => name === animal);
      const selectedId = selectedAniaml?.id;
      onFillIn({ animalId: selectedId });
    }
  }, [animal]);

  const handleChange = (e) => {
    if (isCheckBoxChecked(e)) {
      setIsAnimalUnknown(!isAnimalUnknown);
      const valueToSave = (e.target.checked && 'UNKNOWN') || animalKindName || null;
      onFillIn({ animalKindName: valueToSave });
      return;
    }

    if (isInputChange(e)) {
      if (isKindsInput(e)) {
        if (isEmpty(e)) {
          onLeaveBlank('animalKindName');
        } else {
          onFillIn({ animalKindName: e.target.value });
        }
        return;
      }

      if (isAgeInput(e)) {
        if (isEmpty(e)) {
          onLeaveBlank('age', -1);
        } else {
          const age = e.target.value;
          if (age >= maxAge) e.target.value = maxAge;
          else if (age < minAge) e.target.value = minAge;
          onFillIn({ age: Number(e.target.value) });
        }
        return;
      }
    }

    if (isSelectChange(e)) {
      if (isAnimalSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimal(null);
          onLeaveBlank('animalId');
        } else {
          setAnimal(e.target.value);
          onFillIn({ animalId: e.target.value });
        }

        kindsCheckBoxRef.current && (kindsCheckBoxRef.current.checked = false);
        kindsSelectionBoxRef.current && (kindsSelectionBoxRef.current[0].selected = 'selected');
        setIsAnimalUnknown(false);
        onLeaveBlank('animalKindName');
        return;
      }

      if (isKindsSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimalKindName(null);
          onLeaveBlank('animalKindName');
        } else {
          setAnimalKindName(e.target.value);
          onFillIn({ animalKindName: e.target.value });
        }
        return;
      }

      if (isSexSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          onLeaveBlank('sex', 'UNKNOWN');
        } else {
          onFillIn({
            sex:
              (e.target.value === '수컷' && 'MALE') ||
              (e.target.value === '암컷' && 'FEMALE') ||
              (e.target.value === '모름' && 'UNKNOWN')
          });
        }
        return;
      }
    }
  };

  return (
    <Wrapper margin={margin} onChange={handleChange}>
      <Label bgColor="brand">동물 정보</Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          ariaLabel="animal"
          options={['개', '고양이', '기타']}
          defaultOption="동물"
          required
        />
        {((animal === '동물' || animal === null) && <></>) ||
          (animal === '기타' && (
            <>
              <Input
                ariaLabel="kinds"
                placeholder="동물명 혹은 품종"
                width="50%"
                margin="0 0 0 1.8rem"
                maxLength="50"
                required
                disabled={isAnimalUnknown}
              />
              <CheckBox
                ariaLabel="dont know kinds"
                margin="0 0 0 1.2rem"
                fontSize="1.4rem"
                propRef={kindsCheckBoxRef}
              />
            </>
          )) || (
            <LineBreakWrapper>
              <SelectionBox
                defaultOption="품종"
                margin="1.6rem 0 0 0"
                required
                options={animalList}
                disabled={isAnimalUnknown}
                propRef={kindsSelectionBoxRef}
              />
            </LineBreakWrapper>
          )}
        <LineBreakWrapper>
          <Input
            ariaLabel="age"
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

export default memo(PetInformation);

const isSelectChange = (e) => e.target.tagName === 'SELECT';
const isInputChange = (e) => e.target.tagName === 'INPUT';
const isKindsInput = (e) => e.target.id === 'kinds-input';
const isAgeInput = (e) => e.target.id === 'age-input';
const isAnimalSelection = (e) => e.target[0].textContent === '동물';
const isAnimalSelected = (animal) => animal === '동물';
const isKindsSelection = (e) => e.target[0].textContent === '품종';
const isSexSelection = (e) => e.target[0].textContent === '성별';
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
const isEmpty = (e) => e.target.value.length === 0;
const isCheckBoxChecked = (e) => e.target.type === 'checkbox';
const maxAge = 499;
const minAge = 0;
