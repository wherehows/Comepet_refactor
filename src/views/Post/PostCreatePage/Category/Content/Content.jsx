import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Label } from '@/components/Label';

const Content = ({ margin, onFillIn, onLeaveBlank }) => {
  const handleInput = (e) => {
    const pureText = e.target.textContent;
    const textWithTags = e.target.innerHTML;
    isInputEmpty(pureText) ? onLeaveBlank('content') : onFillIn({ content: textWithTags });
  };

  const handleKeyDown = (e) => {
    if (isPureTextLengthMoreThan255(e) && isBackSpaceEntered(e)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper margin={margin}>
      <Label htmlFor="content" bgColor="brand">
        내용
      </Label>
      <ContentEditor
        id="content"
        margin="1.8rem 0 0 0"
        contentEditable
        placeholder="내용을 입력해주세요"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onPaste={handlePaste}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const ContentEditor = styled.div`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '2rem'};
  border: ${({ border }) => border || '0'};
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.08);
  outline: none;

  &:empty:before {
    content: attr(placeholder);
    color: ${({ theme }) => theme.colors.normalRed};
    display: inline-block;
    opacity: 0.5;
  }
`;

Content.propTypes = {
  margin: PropTypes.string,
  onFillIn: PropTypes.func,
  onLeaveBlank: PropTypes.func
};

export default memo(Content);

const isInputEmpty = (string) => string.length === 0;
const isPureTextLengthMoreThan255 = (e) => e.target.textContent.length >= 255;
const isBackSpaceEntered = (e) => e.key === 'Backspace';
