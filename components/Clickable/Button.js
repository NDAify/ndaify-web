import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0;
  padding-left: 1pc;
  padding-right: 1pc;
  text-align: center;
  font-family: inherit;
  font-size: 20px;
  font-weight: 200;
  border-radius: 4px;
  border: 0;
  text-decoration: none;
  letter-spacing: 1.8px;
  color: #ffffff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;

  cursor: pointer;

  ${(props) => (props.color ? `background-color: ${props.color};` : '')}
  ${(props) => (props.outline ? `
      width: unset;
      height: 40px;
      background-color: transparent;
      border: 1px solid #ffffff;
    ` : '')
}
  ${(props) => (props.compact ? `
      width: unset;
      height: 40px;
      border: 0;
    ` : '')
}

  :focus {
    outline: -webkit-focus-ring-color auto 5px;;
    outline-offset: 0px;
  }

  :disabled {
    cursor: not-allowed;
  }

  @media screen and (min-width: 992px) {
    font-size: 24px;

    ${(props) => {
    if (props.outline || props.compact) {
      return `
          font-size: 20px;
        `;
    }
    return '';
  }};
  }
`;

export default ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button {...rest}>
    {children}
  </Button>
);
