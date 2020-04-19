import React from 'react';

import styled from 'styled-components';

import WarningIcon from './images/warning.svg';

const ErrorPopUp = styled.div`
  color: #edd9a3;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #edd9a3;
  border-radius: 10px;
  display: flex;

  svg {
    width: 20px;
    margin-right: 0.5pc;
  }

  ${(props) => (props.color ? `
    color: ${props.color};
    border-color: ${props.color};

    svg {
      path {
        fill: ${props.color};
      }
    }
  ` : '')}
`;

const ErrorMessage = ({ children, ...rest }) => (
  <ErrorPopUp
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    <WarningIcon />
    {children}
  </ErrorPopUp>
);

export default ErrorMessage;
