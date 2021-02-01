import React from 'react';

import styled from 'styled-components';

import Warning from './images/warning.svg';

const WarningIcon = styled(Warning)`
  color: var(--ndaify-secondary);
`;

const ErrorPopUp = styled.div`
  color: var(--ndaify-accents-primary);
  font-weight: 200;
  padding: 8px;
  border: 1px solid var(--ndaify-accents-primary);
  border-radius: var(--ndaify-accents-radius-2);
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
