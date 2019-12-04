import React, { Fragment } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 20px;
  font-weight: 200;
  background-color: #ffffff;
  border-radius: 4px;
  border: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  letter-spacing: 1.8px;
  box-sizing: border-box;
  padding: 16px;

  @media screen and (min-width: 994px) {
    font-size: 24px;
  }

  &::placeholder {
    color: #aaaaaa;
  }
`;

const Input = (props) => {
  const { placeholder, innerRef, field, ...otherProps } = props;

  return (
    <Fragment>
      <StyledInput ref={innerRef} placeholder={placeholder} {...field} {...otherProps} />
    </Fragment>
  );
};

export default Input;
