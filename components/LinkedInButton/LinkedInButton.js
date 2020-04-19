import React from 'react';

import styled from 'styled-components';
import Button from '../Clickable/Button';

import LinkedInLogoIcon from './images/linkedInLogo.svg';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 0;
`;

const LinkedInLogoWrapper = styled.div`
  margin-top: -2px;

  svg {
    width: 64px;
    height: 64px;
  }
`;

const ButtonText = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LinkedInButton = ({ children, ...otherProps }) => (
  <StyledButton
    color="#0F96CC"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    <LinkedInLogoWrapper>
      <LinkedInLogoIcon />
    </LinkedInLogoWrapper>
    <ButtonText>
      {children}
    </ButtonText>
  </StyledButton>
);

export default LinkedInButton;
