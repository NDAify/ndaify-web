import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

const StyledInput = styled.input`
  font-family: inherit;
  font-size: 20px;
  font-weight: 200;
  background-color: var(--ndaify-input-bg);
  color: var(--ndaify-input-fg);
  border-radius: var(--ndaify-input-radius);
  border: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  letter-spacing: 1.8px;
  box-sizing: border-box;
  padding: 16px;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }

  &::placeholder {
    color: var(--ndaify-input-placeholder-color);
  }
`;

const Input = (props) => {
  const [field] = useField(props);

  const handleChange = (e) => {
    // eslint-disable-next-line no-unused-expressions
    props.onChange && props.onChange(e);
    field.onChange(e);
  };

  const onChange = useCallback(handleChange, []);

  return (
    <StyledInput
      ref={props.innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      onChange={onChange}
    />
  );
};

export default Input;
