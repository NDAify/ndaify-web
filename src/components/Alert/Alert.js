import React from 'react';
import styled from 'styled-components';

import CloseImg from './images/close.svg';

const CloseIcon = styled(CloseImg)`
  color: var(--ndaify-accents-0);
`;

const Container = styled.div`
  background-color: var(--ndaify-fg);
  color: var(--ndaify-accents-0);
  padding: 8px;
  padding-left: 12px;
  border-radius: var(--ndaify-accents-radius-1);
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
`;

const Alert = ({
  message,
  style,
  close,
}) => (
  <Container style={style}>
    <AlertText>{message}</AlertText>
    <CloseButton type="button" onClick={close}>
      <CloseIcon />
    </CloseButton>
  </Container>
);

export default Alert;
