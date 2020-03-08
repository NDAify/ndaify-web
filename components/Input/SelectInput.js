
import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

const SelectLabel = styled.div`
  font-size: 20px;
  font-weight: 200;
  background-color: #ffffff;
  border-radius: 4px;
  border: 0;
  width: 100%;
  height: 60px;
  letter-spacing: 1.8px;
  box-sizing: border-box;
  padding: 16px;
  text-align: center;
  position: relative;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const SelectLabelIcon = styled.img`
  position: absolute;
  right: 16px;
  width: 16px;
  top: 24px;
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
`;

const StyledSelect = styled.select`
  color: #aaaaaa;
  font-size: 20px;
  font-weight: 200;
  background-color: #ffffff;
  border-radius: 4px;
  border: 0;
  width: 100%;
  height: 60px;
  letter-spacing: 1.8px;
  box-sizing: border-box;
  padding: 16px;
  text-align-last: center;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-appearance: none;
  opacity: 0;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const StyledOption = styled.option`
  text-align: center;
  text-align-last: center;
`;

const SelectInput = (props) => {
  const [field] = useField(props);

  const { innerRef, options } = props;

  const option = props.options.find(option => option.value === field.value);

  return (
    <SelectContainer>
      <SelectLabel>
        {option.label}
        <SelectLabelIcon src="/static/downIcon.svg" alt="down" />
      </SelectLabel>
      <StyledSelect ref={innerRef} {...props} {...field}>
        {
          options.map(option => (
            <StyledOption key={option.value} value={option.value}>{option.label}</StyledOption>
          ))
        }
      </StyledSelect>
    </SelectContainer>
  );
};

export default SelectInput;
