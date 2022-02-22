import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LineBreakWrapper from '../../Common/LineBreakWrapper';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';
import { CheckBox } from '@/components/CheckBox';
import { isLength as isInputLength, find, getDataMadeBy, Lazy, take, go } from '@/utils/fxjs';

const Kind = ({ animals, onFillIn, onLeaveBlank }) => {
  const [animal, setAnimal] = useState('');
  const [animalKindName, setAnimalKindName] = useState('');
  const [isAnimalUnknown, setIsAnimalUnknown] = useState(false);
  const [animalList, setAnimalList] = useState([]);
  const kindsSelectionBoxRef = useRef(null);
  const kindsCheckBoxRef = useRef(null);

  const handleInitializeCheckBoxAndSelectionBox = () => {
    kindsCheckBoxRef.current && (kindsCheckBoxRef.current.checked = false);
    kindsSelectionBoxRef.current && (kindsSelectionBoxRef.current[0].selected = 'selected');
  };

  const handleFillInAnimalId = (animal) => {
    const animalId = go(
      animals,
      find(({ name }) => name === animal),
      getDataMadeBy((data) => data?.id)
    );

    onFillIn({ animalId });
  };

  const handleSetAnimalList = (animal) => {
    const animalList = go(
      animals,
      find(({ name }) => name === animal),
      getDataMadeBy((data) => data?.kinds),
      Lazy.map(({ name }) => name),
      take(Infinity)
    );

    setAnimalList(animalList);
  };

  const handleFillInAnimalKindName = (e) => {
    let valueToFillIn = null;

    if (isCheckboxChecked(e)) {
      valueToFillIn = 'UNKNOWN';
    } else if (wasAnimalKindNameEntered(animalKindName)) {
      valueToFillIn = animalKindName;
    } else {
      valueToFillIn = null;
    }

    onFillIn({ animalKindName: valueToFillIn });
  };

  const render = (animal) => {
    switch (animal) {
      case '':
      case '동물':
        return null;
      case '기타':
        return (
          <>
            <Input
              ariaLabel="kinds"
              placeholder="동물명 혹은 품종"
              width="50%"
              margin="0 0 0 1.8rem"
              maxLength="50"
              disabled={isAnimalUnknown}
              required
              onChange={(e) => {
                if (isInputLength.equal(0)(e.target.value)) {
                  onLeaveBlank('animalKindName');
                  return;
                }

                const animalKindName = e.target.value;
                setAnimalKindName(animalKindName);
                onFillIn({ animalKindName });
              }}
            />
            <CheckBox
              id="dont-know-kinds"
              ariaLabel="dont know kinds"
              margin="0 0 0 1.2rem"
              fontSize="1.4rem"
              onChange={(e) => {
                setIsAnimalUnknown(!isAnimalUnknown);
                handleFillInAnimalKindName(e);
              }}
              propRef={kindsCheckBoxRef}
            />
          </>
        );
      default:
        return (
          <LineBreakWrapper>
            <SelectionBox
              ariaLabel="kinds"
              defaultOption="품종"
              margin="1.6rem 0 0 0"
              required
              options={animalList || []}
              disabled={isAnimalUnknown}
              propRef={kindsSelectionBoxRef}
              onChange={(e) => {
                if (isDefaultOptionSelected(e)) {
                  setAnimalKindName('');
                  onLeaveBlank('animalKindName');
                  return;
                }

                const animalKindName = e.target.value;
                setAnimalKindName(animalKindName);
                onFillIn({ animalKindName });
              }}
            />
          </LineBreakWrapper>
        );
    }
  };

  return (
    <>
      <SelectionBox
        ariaLabel="animal"
        options={['개', '고양이', '기타']}
        defaultOption="동물"
        required
        onFillIn={onFillIn}
        onLeaveBlank={onLeaveBlank}
        onChange={(e) => {
          if (isDefaultOptionSelected(e)) {
            setAnimal('');
            setAnimalKindName('');
            setAnimalList([]);
            onLeaveBlank('animalId');
            onLeaveBlank('animalKindName');
            return;
          }

          const selectedAnimal = e.target.options[e.target.selectedIndex].value;
          setAnimal(selectedAnimal);
          setIsAnimalUnknown(false);
          handleInitializeCheckBoxAndSelectionBox();
          handleFillInAnimalId(selectedAnimal);
          handleSetAnimalList(selectedAnimal);
          onLeaveBlank('animalKindName');
        }}
      />
      {render(animal)}
    </>
  );
};

Kind.propTypes = {
  animals: PropTypes.array,
  isAnimalUnknown: PropTypes.bool,
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func
};

export default Kind;

const isCheckboxChecked = (e) => e.target.checked;
const wasAnimalKindNameEntered = (animalKindName) =>
  isInputLength.GreaterThanOrEqual(1)(animalKindName);
const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
