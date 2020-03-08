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
`;

const LinkedInButton = (props) => {
  const { buttonText } = props;

  return (
    <StyledButton
      color="#0F96CC"
      type="button"
      {...props}
    >
      <LinkedInLogo src="/static/linkedInLogo.svg" alt="linkedin-logo" />
      <ButtonText>{buttonText}</ButtonText>
    </StyledButton>
  );
};

export default LinkedInButton;
