import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

import DownImg from './images/down.svg';

const DownIcon = styled(DownImg)`
  color: var(--ndaify-input-fg);

  ${(props) => (props.outline ? `
    color: var(--ndaify-fg);
  ` : '')}
`;

const SelectLabel = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 200;
  background-color: var(--ndaify-input-bg);
  color: var(--ndaify-input-fg);
  border-radius: var(--ndaify-input-radius);
  border: 0;
  width: 100%;
  height: 100%;
  letter-spacing: 1.8px;
  box-sizing: border-box;
  padding: 16px;
  text-align: center;
  position: relative;

  ${(props) => (props.outline ? `
    background-color: transparent;
    color: var(--ndaify-fg);
    border: 1px solid var(--ndaify-fg);
  ` : '')}

  ${(props) => (props.compact ? `
    font-size: 16px;
    line-height: 24px;
    padding: 8px;
    padding-right: 24px;
    padding-left: 24px;
    letter-spacing: 0px;
  ` : '')}
  
  @media screen and (min-width: 992px) {
    font-size: 24px;
    line-height: 32px;

    ${(props) => (props.compact ? `
      line-height: 24px;
      font-size: 16px;
    ` : '')}
  }
`;

const DownIconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 24px;
  width: 16px;
  display: flex;

  svg {
    width: 16px;
    height: auto;
  }

  ${(props) => (props.compact ? `
    right: 8px;
    top: 16px;
    width: 8px;

    svg {
      width: 8px;
    }
  ` : '')}
`;

const SelectContainer = styled.div`
  position: relative;
  ${(props) => (props.compact ? 'height: 40px;' : 'height: 60px;')}
`;

const StyledSelect = styled.select`
  font-size: inherit;
  font-weight: inherit;
  border-radius: var(--ndaify-input-radius);
  border: 0;
  width: 100%;
  letter-spacing: 1.8px;
  box-sizing: border-box;
  padding: 16px;
  text-align-last: center;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-appearance: none;
  opacity: 0;

  ${(props) => (props.compact ? `
    height: 40px;
  ` : `
    height: 60px;
  `)}
`;

const StyledOption = styled.option`
  text-align: center;
  text-align-last: center;
`;

export const SelectInputImpl = (props) => {
  const option = props.options.find((opt) => opt.value === props.value);

  const { innerRef, options } = props;
  
  return (
    <SelectContainer compact={props.compact} outline={props.outline}>
      <SelectLabel compact={props.compact} outline={props.outline}>
        {option?.label || props.placeholder}
        <DownIconWrapper compact={props.compact} outline={props.outline}>
          <DownIcon compact={props.compact} outline={props.outline} />
        </DownIconWrapper>
      </SelectLabel>
      <StyledSelect
        ref={innerRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {
          options.map((opt) => (
            <StyledOption key={opt.value} value={opt.value}>{opt.label}</StyledOption>
          ))
        }
      </StyledSelect>
    </SelectContainer>
  )
};

const SelectInput = (props) => {
  const [field] = useField(props);

  return (
    <SelectInputImpl
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
    />
  );
};

export default SelectInput;
