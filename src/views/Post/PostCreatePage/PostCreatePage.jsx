import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import {
  Status,
  Date,
  Place,
  Contact,
  PetInformation,
  ChipInformation,
  HashTag,
  Content,
  PetPhoto
} from './Category';
import useForm from '@/hooks/useForm';
import { placeData, animalData } from '@/data/data';

const MARGIN_BETWEEN_CATEGORY = '5rem 0 0 0';

const PostCreatePage = () => {
  const navigate = useNavigate();

  const { values, handleFillIn, handleLeaveBlank, handleSubmit } = useForm({
    initialValues: {
      status: null,
      date: null,
      cityId: null,
      townId: null,
      detailAddress: null,
      telNumber: null,
      animalId: null,
      animalKindName: null,
      age: null,
      sex: null,
      chipNumber: null,
      tags: [],
      content: null,
      images: null
    },
    onSubmit: async () => {
      const formData = makeFormDataAppendingImages(values.images);

      const { images, ...param } = values; // eslint-disable-line no-unused-vars
      formData.append('param', new Blob([JSON.stringify(param)], { type: 'application/json' }));

      return false;
    },
    handleNavigate: (res) => {
      navigate(`/post/${res.id}`, { replace: true });
    },
    validate: ({
      status,
      date,
      telNumber,
      cityId,
      townId,
      animalId,
      animalKindName,
      sex,
      age,
      content
    }) => {
      const errors = {};

      if (!status) errors.status = '상태를 입력해주세요';
      if (!date) errors.date = '날짜를 입력해주세요';
      if (!cityId) errors.cityId = '시/도를 선택해주세요';
      if (!townId) errors.townId = '시/군/구를 선택해주세요';
      if (!animalId) errors.animalId = '동물 종류를 선택해주세요';
      if (!animalKindName) errors.animalKindName = '품종을 선택해주세요';
      if (!telNumber) errors.telNumber = '전화번호를 입력해주세요';
      if (!sex) errors.sex = '성별을 선택해주세요';
      if (!age) errors.age = '나이를 입력해주세요';
      if (!content) errors.content = '내용을 작성해주세요';
      return errors;
    }
  });

  return (
    <Wrapper>
      <Form>
        <Status onFillIn={handleFillIn} onLeaveBlank={handleLeaveBlank} />
        <Date
          margin={MARGIN_BETWEEN_CATEGORY}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
        />
        <Place
          margin={MARGIN_BETWEEN_CATEGORY}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
          places={placeData.cities}
        />
        <Contact
          margin={MARGIN_BETWEEN_CATEGORY}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
        />
        <PetInformation
          margin={MARGIN_BETWEEN_CATEGORY}
          animals={animalData.animals}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
        />
        <ChipInformation
          margin={MARGIN_BETWEEN_CATEGORY}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
        />
        <HashTag
          margin={MARGIN_BETWEEN_CATEGORY}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
        />
        <PetPhoto margin={MARGIN_BETWEEN_CATEGORY} onFillIn={handleFillIn} />
        <Content
          margin={MARGIN_BETWEEN_CATEGORY}
          onFillIn={handleFillIn}
          onLeaveBlank={handleLeaveBlank}
        />
        <ButtonWrapper margin={MARGIN_BETWEEN_CATEGORY}>
          <Button width="60%" margin="5% auto 0 auto" bgColor="normalOrange" onClick={handleSubmit}>
            작성하기
          </Button>
          <Button
            width="60%"
            margin="5% auto 0 auto"
            bgColor="brand"
            onClick={() => navigate(-1)}
            type="button">
            취소하기
          </Button>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10rem 2.4rem 2.4rem 2.4rem;
`;

const Form = styled.form``;

const ButtonWrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

export default PostCreatePage;

const makeFormDataAppendingImages = (images) => {
  const formData = new FormData();

  if (!images) {
    return formData.append('images', []);
  }

  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  return formData;
};
