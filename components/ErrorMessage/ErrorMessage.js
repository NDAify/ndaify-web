import React from 'react';

import styled from 'styled-components';

const ErrorPopUp = styled.div`
  margin-bottom: 3pc;
  color: #edd9a3;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #edd9a3;
  border-radius: 10px;
  display: flex;
`;

const WarningIcon = styled.img`
  width: 18px;
  margin-right: 0.5pc;
`;

const ErrorMessage = ({ message }) => (
  <ErrorPopUp>
    <WarningIcon src="/static/warningIcon.svg" alt="warning icon" />
    {message}
  </ErrorPopUp>
);

export default ErrorMessage;
