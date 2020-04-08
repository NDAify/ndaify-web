import React from 'react';

import styled from 'styled-components';
import Button from '../Clickable/Button';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 0;
`;

const LinkedInLogo = styled.img`
  width: 64px;
  height: 64px;
  margin-top: -2px;
`;

const ButtonText = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LinkedInButton = ({ children, ...otherProps }) => {
  return (
    <StyledButton
      color="#0F96CC"
      {...otherProps}
    >
      <LinkedInLogo src="/static/linkedInLogo.svg" alt="linkedin-logo" />
      <ButtonText>
        {children}
      </ButtonText>
    </StyledButton>
  );
};

export default LinkedInButton;
