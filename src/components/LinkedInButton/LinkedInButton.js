import React from 'react';

import styled from 'styled-components';
import Button from '../Clickable/Button';

import LinkedInLogoIcon from './images/linkedInLogo.svg';

const StyledButton = styled(Button)`
  padding: 0;

  :focus {
    svg {
      path:nth-of-type(1) {
        filter: brightness(90%);
      }
    }
  }
`;

const LinkedInButtonContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LinkedInLogoWrapper = styled.div`
  svg {
    width: 100%;
    height: 100%;
  }

  padding: 0;
  margin: 0;
  display: inline-flex;
  margin-top: -2px;
`;

const ButtonText = styled.span`
  flex: 1;
`;

const LinkedInButton = ({ children, ...otherProps }) => (
  <StyledButton
    color="#0F96CC"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    <LinkedInButtonContent>
      <LinkedInLogoWrapper>
        <LinkedInLogoIcon />
      </LinkedInLogoWrapper>

      <ButtonText>
        {children}
      </ButtonText>

    </LinkedInButtonContent>
  </StyledButton>
);

export default LinkedInButton;
