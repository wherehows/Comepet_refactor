import React, { useRef, useState, memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Slider } from '@/components/Slider';
import { Button } from '@/components/Button';
import { Lazy, take, go, pipe, isLength } from '@/utils/fxjs';

const PetPhoto = ({ margin, onFillIn }) => {
  const [files, setFiles] = useState([]);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);

  const inputRef = useRef(null);

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleChangeFile = (e) => {
    if (isTheNumberOfPhotosUnderFour(e) && areFileSizesUnder5MB(e)) {
      setFiles(makeDataFormForSlider(e));
      setIsErrorOccurred(false);
      onFillIn({ images: e.target.files });
      return;
    }

    setFiles([]);
    setIsErrorOccurred(true);
  };

  return (
    <Wrapper margin={margin}>
      <Slider imageList={files} size="large" />
      <Input onChange={handleChangeFile} ref={inputRef} type="file" accept="image/*" multiple />
      <Caution isErrorOccurred={isErrorOccurred}>※ 이미지 3개를 동시에 선택해주세요</Caution>
      <Caution isErrorOccurred={isErrorOccurred}>한 장당 5MB 이하여야만 합니다.</Caution>
      <Button
        width="60%"
        margin="5% auto 0 auto"
        bgColor="normalOrange"
        type="button"
        onClick={handleChooseFile}>
        반려동물 사진 등록
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const Caution = styled.div`
  color: ${({ isErrorOccurred, theme }) => isErrorOccurred && theme.colors.normalRed};
  font-size: 1.3rem;
  font-weight: ${({ isErrorOccurred }) => isErrorOccurred && 'bold'};
`;

const Input = styled.input`
  display: none;
`;

PetPhoto.propTypes = {
  onFillIn: PropTypes.func,
  margin: PropTypes.string
};

export default memo(PetPhoto);

const areFileSizesUnder5MB = (e) => {
  const doesFileExistOver5MB = pipe(
    Lazy.filter((file) => file.size > 1024 * 1024 * 5),
    take(1),
    isLength.GreaterThanOrEqual(1)
  );

  return !doesFileExistOver5MB([...e.target.files]);
};

const isTheNumberOfPhotosUnderFour = (e) => isLength.LessThanOrEqual(3)(e.target.files);

const makeDataFormForSlider = (e) => {
  return go(
    [...e.target.files],
    Lazy.map((file) => ({
      image: URL.createObjectURL(file)
    })),
    take(Infinity)
  );
};
