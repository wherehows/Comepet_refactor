import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import uuid from 'react-uuid';

const HashTag = ({ margin, onFillIn, onLeaveBlank }) => {
  const [tags, setTags] = useState([]);
  const [error, setErrors] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e) => {
    if (
      isEnterEntered(e) &&
      !isEmpty(inputValue) &&
      isStringLengthUnder6(inputValue) &&
      isNumberOfTagsUnder6(tags)
    ) {
      setErrors('');
      handleAppendTag(inputValue);
      setInputValue('');
    }

    if ((isEnterEntered(e) && !isStringLengthUnder6(inputValue)) || !isNumberOfTagsUnder6(tags)) {
      setErrors('5글자씩 총 6개까지만 입력이 가능합니다');
    }
  };

  const handleAppendTag = (nextTag) => {
    const nextTags = tags.concat({ name: `${nextTag}`, id: uuid() });

    setTags(nextTags);
    onFillIn({ tags: nextTags });
  };

  const handleDelete = (key) => {
    const nextTags = tags.filter(({ id }) => id !== key);

    setTags(nextTags);
    isTagEmpty(nextTags) ? onLeaveBlank('tags', []) : onFillIn({ tags: nextTags });
  };

  return (
    <Wrapper margin={margin}>
      <Label htmlFor="hash-tag" bgColor="brand">
        해쉬태그 입력
      </Label>
      <Input
        id="hash-tag"
        placeholder="해쉬태그 입력 후 엔터를 눌러주세요"
        margin="1.8rem 0 1.8rem 0"
        onChange={handleInput}
        onKeyPress={handleEnter}
        value={inputValue}
      />
      <Error error={error}>{error}</Error>
      <HashTagWrapper>
        <TagList>
          {tags.map(({ name, id }) => (
            <TagWrapper key={id}>
              <Tag>#{name}</Tag>
              <Button onClick={() => handleDelete(id)} type="button">
                <StyledCancelRoundedIcon />
              </Button>
            </TagWrapper>
          ))}
        </TagList>
      </HashTagWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const Error = styled.div`
  visibility: ${({ error }) => (error.length && 'visible') || 'hidden'};
  margin: 0 0 0 0.8rem;
  color: ${({ theme }) => theme.colors.normalRed};
  font-size: 1.2rem;
`;

const HashTagWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0.8rem;
`;

const TagWrapper = styled.li`
  display: flex;
  align-items: center;
  margin: 0.6rem 0.6rem 0 0;
`;

const Tag = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.normalGreen};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 0 0 0 0.6rem;
  padding: 0;
  color: ${({ theme }) => theme.colors.normalGreen};

  :hover {
    color: ${({ theme }) => theme.colors.normalRed};
  }
`;

const StyledCancelRoundedIcon = styled(CancelRoundedIcon)``;

HashTag.propTypes = {
  margin: PropTypes.string,
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func
};

export default memo(HashTag);

const isTagEmpty = (array) => array.length === 0;
const isEnterEntered = (e) => e.key === 'Enter';
const isEmpty = (string) => string.length === 0;
const isStringLengthUnder6 = (string) => string.length < 6;
const isNumberOfTagsUnder6 = (tags) => tags.length < 6;
