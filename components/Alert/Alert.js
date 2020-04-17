import React from 'react';
import styled from 'styled-components';

import Close from './images/close.svg';

const Container = styled.div`
  background-color: #FFFFFF;
  color: #424657;
  padding: 8px;
  padding-left: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 100px -20px rgba(50,50,93,0.25), 0 -18px 60px -10px rgba(0,0,0,0.02);
  min-width: 300px;
  font-size: 16px;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const AlertText = styled.span`
  flex: 1;
`;

const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  margin-left: 6px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #FFFFFF;
`;

const Alert = ({
  message,
  style,
  close,
}) => (
  <Container style={style}>
    <AlertText>{message}</AlertText>
    <CloseButton type="button" onClick={close}>
      <Close />
    </CloseButton>
  </Container>
);

export default Alert;
