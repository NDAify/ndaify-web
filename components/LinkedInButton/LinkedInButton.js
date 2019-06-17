import React from 'react';
import getConfig from 'next/config';
import shortid from 'shortid';

import styled from 'styled-components';
import Button from '../Button/Button';

import { getClientOrigin, serializeOAuthState } from '../../util';

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #0F96CC;
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
      type="button"
      onClick={() => {
        const formSessionKey = shortid.generate();

        const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;

        const oAuthState = serializeOAuthState({
          formSessionKey,
        });

        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`;
      }}
    >
      <LinkedInLogo src="/static/linkedInLogo.svg" alt="linkedin-logo" />
      <ButtonText>{buttonText}</ButtonText>
    </StyledButton>
  );
};

export default LinkedInButton;
